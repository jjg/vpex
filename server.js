var http = require('http');

http.createServer(function (req, res) {


	console.log('request:');
	console.log(req.url);

	var payload = null;

	var route = req.url.split('/');
	route = route[1].split('?');

	console.log('selected route: ' + route[0]);

	switch(route[0]){
		case 'getjob':
			payload = getJob();
			break;
		case 'updatejob':
			payload = updateJob(req.url);
			break;
	}

	console.log(payload);
 	res.writeHead(200, {'Content-Type': 'text/plain'});
 	res.end(payload);

}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

function getJob(){

	var payload = "{\"code\": \"function sayHello(who){var helloPhrase = \'hello \' + who;return helloPhrase} sayHello(data.username);\",\"data\":{\"username\": \"jason\"}}";

	return payload
}

function updateJob(result){
	console.log(result)
	console.log('job output: ' + result);

	
}