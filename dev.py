#!/usr/bin/env python3
"""Local server that mirrors the Vercel rewrite: /about serves index.html.
Run: python3 dev.py  → http://localhost:8000"""
import http.server, socketserver, sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.split('?')[0] in ('/about', '/about/'):
            self.path = '/index.html'
        return super().do_GET()
    def log_message(self, *a):
        pass

with socketserver.TCPServer(('', PORT), Handler) as httpd:
    print(f'http://localhost:{PORT}')
    httpd.serve_forever()
