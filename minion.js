function doBidding(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
		{
	  		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    	{
				//console.log(xmlhttp.responseText);

				var payload = xmlhttp.responseText;

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
				var cbxmlhttp = new XMLHttpRequest();
				cbxmlhttp.open("GET",'http://localhost:1337/status?nodeid=1313&capacity=' + result, true);
				//cbxmlhttp.open("GET",'http://localhost:1337/updatejob?result=' + result,true);
				cbxmlhttp.send();
	    	}
	  	}
	xmlhttp.open("GET","http://localhost:1337/getjob",true);
	xmlhttp.send();
}

doBidding();

/*
setInterval(function(){
	doBidding();
},5000);
*/