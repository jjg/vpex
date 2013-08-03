var http = require('http');

http.createServer(function (req, res) {

	console.log('request:');
	console.log(req);

	var payload = "{\"code\": \"function sayHello(who){var helloPhrase = \'hello \' + who;return helloPhrase} sayHello(data.username);\",\"data\":{\"username\": \"jason\"}}";

 	res.writeHead(200, {'Content-Type': 'text/plain'});
 	res.end(payload);

}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');