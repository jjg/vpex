var http = require('http');

var options = {
	hostname: 'localhost',
	port: 1337,
	path: '/getjob',
	method: 'GET'
};

var req = http.request(options, function(res) {

	  res.setEncoding('utf8');

	  res.on('data', function (chunk) {

	    	var payload = chunk;

	    	parsedPayload = JSON.parse(payload);

			data = eval(parsedPayload.data);

			var result = null;

			try{
				result = eval(parsedPayload.code);
			}catch(err){
				result = 'fail';
			}

			console.log('job output:');
			console.log(result);

			// callback
			http.get("http://localhost:1337/updatejob?result=" + result, function(res) {

  				//console.log("Got response: " + res.statusCode);

			}).on('error', function(e) {

  				console.log("error making callback: " + e.message);

			});
	  });
});

req.on('error', function(e) {
  	console.log('problem with request: ' + e.message);
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();