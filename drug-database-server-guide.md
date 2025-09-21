# Drug Database Server Setup Guide

## Problem
The drug search engine is currently showing only 56 sample drugs instead of the full 14,350 drugs because of CORS restrictions when opening HTML files directly (file:// protocol).

## Solution
To load the full database, you need to serve the files through a web server.

## Quick Setup Options

### Option 1: Python Server (Recommended)
```bash
# Navigate to the project directory
cd "C:\Users\Danny.Soong\projects\hygienefirst_tvp\hygienefirst_tvp-1"

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000/藥物分類搜尋引擎器.html`

### Option 2: Node.js Server
```bash
# Install http-server globally
npm install -g http-server

# Navigate to project directory
cd "C:\Users\Danny.Soong\projects\hygienefirst_tvp\hygienefirst_tvp-1"

# Start server
http-server -p 8000
```

Then open: `http://localhost:8000/藥物分類搜尋引擎器.html`

### Option 3: Live Server (VS Code Extension)
1. Install "Live Server" extension in VS Code
2. Right-click on `藥物分類搜尋引擎器.html`
3. Select "Open with Live Server"

## Expected Results
With a proper server:
- Full database: 14,350 drugs
- Class A drugs: 11,114 (🔴 Red recycling box)
- Non-Class A drugs: 3,235 (🔵 Blue recycling box)
- Proper pagination: 50 items per page
- Jump to page functionality

## Current Status
- Sample data: 56 drugs (fallback)
- Full database: 14,350 drugs (requires server)
- Pagination: 50 items per page
- Jump to page: Available
