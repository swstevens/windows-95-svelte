# Blog API Server

A lightweight Go + SQLite API server for the blog's guestbook and visitor counter.

## Features

- **SQLite database** - All data stored in `blog.db` file
- **Guestbook** - Read and create entries
- **Visitor Counter** - Track site visits
- **Spam removal** - DELETE endpoint (localhost only)
- **CORS enabled** - Works with GitHub Pages frontend
- **Single binary** - Easy to deploy on Raspberry Pi

## API Endpoints

### GET /health
Health check endpoint
```bash
curl http://localhost:8080/health
```

### GET /guestbook
Get all guestbook entries (last 50, ordered by newest)
```bash
curl http://localhost:8080/guestbook
```

Response:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "message": "Great site!",
    "date": "Nov 25",
    "created_at": "2025-11-25T10:30:00Z"
  }
]
```

### POST /guestbook
Add a new guestbook entry
```bash
curl -X POST http://localhost:8080/guestbook \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "message": "Great site!"}'
```

### DELETE /guestbook/delete/{id}
Delete a guestbook entry (localhost only for spam removal)
```bash
curl -X DELETE http://localhost:8080/guestbook/delete/1
```

**Security:** This endpoint only works when called from localhost (127.0.0.1 or ::1)

### GET /visitor-count
Get the visitor count
```bash
curl http://localhost:8080/visitor-count
```

Response:
```json
{
  "id": 1,
  "count": 1337
}
```

## Setup

### 1. Install Go
On Raspberry Pi:
```bash
sudo apt update
sudo apt install golang
```

### 2. Build the server
```bash
cd api-server
go mod download
go build -o blog-api
```

### 3. Run the server
```bash
./blog-api
```

Or set a custom port:
```bash
PORT=3000 ./blog-api
```

### 4. Port forwarding
On your router, forward external port (e.g., 8080) to your Raspberry Pi's IP and port 8080.

## Database

The server automatically creates `blog.db` with two tables:

### guestbook
- `id` - Auto-incrementing primary key
- `name` - Guest name
- `message` - Guest message
- `date` - Display date (e.g., "Nov 25")
- `created_at` - Timestamp

### visitor_count
- `id` - Always 1 (single row)
- `count` - Current visitor count (default: 1337)

## Running as a Service

Create a systemd service on Raspberry Pi:

```bash
sudo nano /etc/systemd/system/blog-api.service
```

Add:
```ini
[Unit]
Description=Blog API Server
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/blog-api
ExecStart=/home/pi/blog-api/blog-api
Restart=always
Environment=PORT=8080

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable blog-api
sudo systemctl start blog-api
sudo systemctl status blog-api
```

## Updating Your Frontend

Update `src/lib/supabase.ts` to point to your Raspberry Pi:

```typescript
const API_URL = browser ? import.meta.env.VITE_API_URL : '';
// e.g., http://your-domain.com:8080 or http://your-ip:8080
```

Then update the fetch calls to use your endpoints.

## Security Notes

- DELETE endpoint only works from localhost
- CORS is enabled for all origins (adjust in code if needed)
- Consider adding rate limiting for production
- Use HTTPS with a reverse proxy (nginx, caddy) for production
- The database file is not tracked in git

## Manual Database Updates

To manually update visitor count:
```bash
sqlite3 blog.db "UPDATE visitor_count SET count = 2000 WHERE id = 1"
```

To view all entries:
```bash
sqlite3 blog.db "SELECT * FROM guestbook"
```

To delete spam entry:
```bash
sqlite3 blog.db "DELETE FROM guestbook WHERE id = 5"
```
