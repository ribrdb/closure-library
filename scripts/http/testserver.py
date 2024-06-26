#!/usr/bin/env python3
import io
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import os

def load_exports():
    with io.open(os.path.join(os.path.dirname(__file__), '../../exports.json')) as f:
        return json.load(f)

exports = load_exports()

class TestServer(SimpleHTTPRequestHandler):
    def send_head(self):
        # TODO: maybe insert the importmap into html files here instead of putting it in the generated file.

        if not self.path.startswith("/mock/"):
            return SimpleHTTPRequestHandler.send_head(self)
        buf = io.StringIO()
        buf.write("import * as $original from '%s';\n" % self.path.replace("/mock/closure/", "/orig/closure/"))
        mod_exports = exports.get(self.path.replace("/mock/closure/", "closure/"), [])
        for v in mod_exports:
            if v == "default":
                buf.write("export default $original.default;\n")
            else:
                buf.write("export var %s = $original.%s;\n" % (v, v))
        buf.write("export function $set(name, value) {\n")
        for v in mod_exports:
            if v != "default":
                buf.write("  if (name === '%s') %s = value;\n" % (v, v))
        buf.write("}\n")

        result = buf.getvalue().encode("utf-8")


        self.send_response(200)
        self.send_header("Content-type", "text/javascript")
        self.send_header("Content-Length", str(len(result)))
        self.end_headers()
        return io.BytesIO(result)
    
    def do_POST(self):
        return self.do_GET()

if __name__ == "__main__":
    server = ThreadingHTTPServer(("localhost", 8080), TestServer)
    server.serve_forever()