vpex
====

Virus-inspired distributed computing

A processing node that gets both its data and instructions via external service call.  Since the program is "inserted" into the node from an external source it is "virus-like", hosting the instructions of another.

The simplest implementation I can imagine for this is a Raspberry Pi running Node.js.  A short node program is written that polls an external service at a regular interval requesting the next job.  A job consists of a block of JSON containing a node which in turn contains the code to be executed, and any data the code needs to do its work is stored in (or referenced in) other structures within the same javascript block.


##ex. 1:##
`````
     {
         "code": "function sayHello(who){var helloPhrase='hello '+who;return helloPhrase} sayHello(data.username);",
         "data": {
             "username": "jason"
         }
     }
`````

The node code then simply parses the JSON, loads the data and executes the code (via exec()):

##ex. 2:##
`````
	function runJob(payload){

	     parsedPayload = JSON.parse(payload);

	     data = eval(parsedPayload.data);

	     console.log(eval(parsedPayload.code));
	}
`````

##nodes##

Nodes can provide a wide range of capabilities.  Node capabilities are defined by the "libraries" included in their host.js code.  If a node receives a job that it can't process due to lack of capability this triggers an exception and the job is returned to the queue to be picked up by another node.