// Create web server

// Include http module,
var http = require("http"),
// And url module, which is very helpful in parsing request parameters.
url = require("url"),
// And fs module.
fs = require("fs");

// Create the server.
http.createServer(function(request, response) {
	// Attach listener on end event.
	request.on('end', function() {
		// Parse the request for arguments and store them in _get variable.
		var _get = url.parse(request.url, true).query;
		// Test if it is a comment request.
		if (url.parse(request.url).pathname == '/comment') {
			// Prepare the header
			response.writeHead(200, {
				"Content-Type" : "text/plain"
			});
			// Prepare the content
			var responseString = "Your name is: " + _get['name'] + " and your comment is: " + _get['comment'];
			// Send the response.
			response.end(responseString);
		} else {
			// Read the file and send to the user.
			fs.readFile(__dirname + url.parse(request.url).pathname, function(err, data) {
				if (err) {
					response.writeHead(404, {
						"Content-Type" : "text/plain"
					});
					response.end("Page not found");
					return;
				}
				response.writeHead(200, {
					"Content-Type" : "text/plain"
				});
				response.write(data);
				response.end();
			});
		}
	});
}).listen(8000);

console.log('Server running at http://localhost:8000');