var http = require('http');

// global object to keep track of nodes
var nodes = new Object();
var lastNode = 0;

http.createServer(function (req, res) {

	var payload = 'ok';

	var route = req.url.split('/');
	route = route[1].split('?');

	switch(route[0]){
		case 'getjob':
			nodeId = req.url.split('?')[1].split('=')[1];

			if(nodeId == 'null'){

				nodeId = lastNode + 1;

				lastNode++;
			}

			payload = getJob(nodeId);
			break;
		case 'updatejob':
			var jobResult = req.url.split('?')[1]
			payload = updateJob(jobResult);
			break;
		case 'status':
			var querystring = req.url.split('?')[1];

			if(querystring == null){

				payload = JSON.stringify(nodes);

				for(n in nodes){
					console.log(payload);
				}

			} else {

				var params = querystring.split('&');

				var node = new Object();
				node.nodeId = params[0].split('=')[1];
				node.capacity = params[1].split('=')[1];
				node.lastUpdate = new Date().getTime();

				nodes[node.nodeId] = node;

				console.log('###nodeinfo###');
				for(n in nodes){
					console.log(nodes[n].nodeId + ':' + nodes[n].capacity + ':' + nodes[n].lastUpdate);
				}
			}

	}

 	res.writeHead(200, {'Content-Type': 'text/plain','Access-Control-Allow-Origin': '*'});
 	res.end(payload);

}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

function getJob(nodeId){

	var payload = "{\"nodeId\":\"" + nodeId + "\",\"callback\":\"\'http://\'+ strawboss + \'/status?nodeid=\' + nodeId + \'&capacity=\' + result\",\"code\":\"function getFlops(){var s = new Date().getTime(); for(i=0;i<10000;i++){m = 10 / 3.3;} var e = new Date().getTime(); d = e - s;  return d;} getFlops();\", \"data\":{}}"
	//var payload = "{\"code\": \"function sayHello(who){var helloPhrase = \'hello \' + who;return helloPhrase} sayHello(data.username);\",\"data\":{\"username\": \"jason\"}}";
	//var payload = "{\"code\": \"function stealPasswd(){fs.readFile(\'/etc/passwd\',function(e,t){return t})} stealPasswd();\",\"data\":{}}";

	return payload
}

function updateJob(result){


	//console.log(result)
	//console.log('job output: ' + result);

	return result

}
