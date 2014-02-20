#!/usr/bin/env python2.7
import SimpleHTTPServer
import SocketServer

PORT = 8081

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "Server running on port", PORT
httpd.serve_forever()
