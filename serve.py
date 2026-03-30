from http.server import HTTPServer, SimpleHTTPRequestHandler
HTTPServer(("0.0.0.0",8000), SimpleHTTPRequestHandler).serve_forever()
