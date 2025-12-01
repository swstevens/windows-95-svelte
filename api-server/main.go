package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

type GuestbookEntry struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	Message   string `json:"message"`
	Date      string `json:"date"`
	CreatedAt string `json:"created_at"`
}

type VisitorCount struct {
	ID    int `json:"id"`
	Count int `json:"count"`
}

var db *sql.DB

func main() {
	var err error
	db, err = sql.Open("sqlite3", "./blog.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Initialize database tables
	if err := initDB(); err != nil {
		log.Fatal(err)
	}

	// Setup routes
	http.HandleFunc("/guestbook", corsMiddleware(handleGuestbook))
	http.HandleFunc("/guestbook/delete/", corsMiddleware(handleDeleteGuestbook))
	http.HandleFunc("/visitor-count", corsMiddleware(handleVisitorCount))
	http.HandleFunc("/health", corsMiddleware(handleHealth))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func initDB() error {
	// Create guestbook table
	_, err := db.Exec(`
		CREATE TABLE IF NOT EXISTS guestbook (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			message TEXT NOT NULL,
			date TEXT NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)
	`)
	if err != nil {
		return err
	}

	// Create visitor_count table
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS visitor_count (
			id INTEGER PRIMARY KEY CHECK (id = 1),
			count INTEGER NOT NULL DEFAULT 1337
		)
	`)
	if err != nil {
		return err
	}

	// Initialize visitor count if not exists
	_, err = db.Exec(`
		INSERT OR IGNORE INTO visitor_count (id, count) VALUES (1, 1337)
	`)
	return err
}

// CORS middleware to allow cross-origin requests
func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

func handleHealth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func handleGuestbook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	switch r.Method {
	case "GET":
		getGuestbookEntries(w, r)
	case "POST":
		addGuestbookEntry(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func getGuestbookEntries(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query(`
		SELECT id, name, message, date, created_at
		FROM guestbook
		ORDER BY created_at DESC
		LIMIT 50
	`)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var entries []GuestbookEntry
	for rows.Next() {
		var entry GuestbookEntry
		if err := rows.Scan(&entry.ID, &entry.Name, &entry.Message, &entry.Date, &entry.CreatedAt); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		entries = append(entries, entry)
	}

	if entries == nil {
		entries = []GuestbookEntry{}
	}

	json.NewEncoder(w).Encode(entries)
}

func addGuestbookEntry(w http.ResponseWriter, r *http.Request) {
	var entry struct {
		Name    string `json:"name"`
		Message string `json:"message"`
	}

	if err := json.NewDecoder(r.Body).Decode(&entry); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if entry.Name == "" || entry.Message == "" {
		http.Error(w, "Name and message are required", http.StatusBadRequest)
		return
	}

	// Generate date string
	date := time.Now().Format("Jan 2")

	result, err := db.Exec(
		"INSERT INTO guestbook (name, message, date) VALUES (?, ?, ?)",
		entry.Name, entry.Message, date,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	id, err := result.LastInsertId()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Return the created entry
	var created GuestbookEntry
	err = db.QueryRow(
		"SELECT id, name, message, date, created_at FROM guestbook WHERE id = ?",
		id,
	).Scan(&created.ID, &created.Name, &created.Message, &created.Date, &created.CreatedAt)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(created)
}

func handleDeleteGuestbook(w http.ResponseWriter, r *http.Request) {
	// Only allow DELETE from localhost for spam removal
	if r.RemoteAddr[:9] != "127.0.0.1" && r.RemoteAddr[:3] != "::1" {
		http.Error(w, "Forbidden: Delete only allowed from localhost", http.StatusForbidden)
		return
	}

	if r.Method != "DELETE" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Extract ID from URL path
	idStr := r.URL.Path[len("/guestbook/delete/"):]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	result, err := db.Exec("DELETE FROM guestbook WHERE id = ?", id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if rowsAffected == 0 {
		http.Error(w, "Entry not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "deleted"})
}

func handleVisitorCount(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Atomically increment the visitor count
	_, err := db.Exec("UPDATE visitor_count SET count = count + 1 WHERE id = 1")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Retrieve the updated count
	var count VisitorCount
	err = db.QueryRow("SELECT id, count FROM visitor_count WHERE id = 1").Scan(&count.ID, &count.Count)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(count)
}
