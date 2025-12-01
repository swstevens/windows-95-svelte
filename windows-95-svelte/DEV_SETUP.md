# Development Setup

This project uses a Go + SQLite API server for the blog backend.

## Prerequisites

- Node.js 18+
- Go 1.21+ (for running the API server)

## Quick Start

### 1. Install Dependencies

```bash
cd windows-95-svelte
npm install
```

### 2. Configure Environment

Create a `.env` file:

```bash
# For local development
VITE_API_URL=http://localhost:8080
```

### 3. Run Development Server

The `npm run dev` command will automatically:
- Start the Go API server on port 8080
- Start the Vite dev server on port 5173
- Both run concurrently in the same terminal

```bash
npm run dev
```

Then open http://localhost:5173

## Development Commands

```bash
# Run both API and frontend (default)
npm run dev

# Run only frontend (if API is already running)
npm run dev:frontend-only

# Build for production
npm run build

# Preview production build
npm run preview
```

## How It Works

### Development Mode (`npm run dev`)

- **API Server**: Runs on `http://localhost:8080`
  - SQLite database created at `../api-server/blog.db`
  - Data persists between runs

- **Frontend**: Runs on `http://localhost:5173`
  - Connects to local API via `VITE_API_URL=http://localhost:8080`
  - Hot reloading enabled

### Production Mode (`npm run build`)

- Frontend is built as static HTML/JS/CSS
- API URL comes from `VITE_API_URL` environment variable (GitHub Secret)
- Points to your Raspberry Pi API server

## API Server

The Go API server is located in `../api-server/` and provides:

- `GET /guestbook` - Fetch entries
- `POST /guestbook` - Add entry
- `GET /visitor-count` - Get count
- `DELETE /guestbook/delete/{id}` - Remove spam (localhost only)

See `../api-server/README.md` for full API documentation.

## Database Management

### View database

```bash
cd ../api-server
sqlite3 blog.db "SELECT * FROM guestbook"
```

### Reset database

```bash
cd ../api-server
rm blog.db
# Restart API server - it will recreate the database
```

### Manual updates

```bash
cd ../api-server
sqlite3 blog.db "UPDATE visitor_count SET count = 5000 WHERE id = 1"
```

## Troubleshooting

### "API not configured" error

Make sure your `.env` file has `VITE_API_URL=http://localhost:8080`

### API server won't start

1. Check if Go is installed: `go version`
2. Make sure port 8080 is not in use
3. Try running manually:
   ```bash
   cd ../api-server
   go run main.go
   ```

### Frontend can't connect to API

1. Check API is running: `curl http://localhost:8080/health`
2. Verify CORS is working (should return `{"status":"ok"}`)
3. Check browser console for errors

## Production Deployment

### GitHub Pages

1. Add GitHub Secret: `VITE_API_URL=http://your-raspberry-pi:8080`
2. Push to main branch
3. GitHub Actions will build and deploy

### Raspberry Pi API Server

See `../api-server/README.md` for:
- Building the binary
- Running as a systemd service
- Port forwarding setup
- HTTPS with reverse proxy
