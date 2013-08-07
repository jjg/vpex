vpex
====

Virus-inspired distributed computing

A processing node that gets both its data and instructions via external service call.  Since the program is "inserted" into the node from an external source it is "virus-like", hosting the instructions of another.

![overview](https://raw.github.com/jjg/vpex/master/vpex.png)

The simplest implementation I can imagine for this is a Raspberry Pi running Node.js.  A short node program is written that polls an external service at a regular interval requesting the next job.  A job consists of a block of JSON containing a node which in turn contains the code to be executed, and any data the code needs to do its work is stored in (or referenced in) other structures within the same javascript block.  If a callback url is supplied, it is evaulated and loaded when the job is complete.


##ex. 1:##
`````
    {
        "nodeId":"666",
        "code": "function sayHello(who){var helloPhrase='hello '+who;return helloPhrase} sayHello(data.username);",
        "data": {
            "username": "jason"
        },
        "callback":"\'http://\'+ strawboss + \':1337/status?nodeid=\' + nodeId + \'&capacity=\' + result"
    }
`````

There are a few "magic" values above:
*  strawboss is the hostname of the queue server; this is dynamic so it can be changed between requests
*  nodeId is handed out by the queue after the minion's first request, and stays until the minion or the strawboss dies
*  capacity is a number reflecting the load of the minion; this might get depreciated soon


The minion code then simply parses the JSON, loads the data and executes the code (via exec()):

##ex. 2:##
`````
	function runJob(payload){

	     parsedPayload = JSON.parse(payload);

	     data = eval(parsedPayload.data);

	     console.log(eval(parsedPayload.code));
	}
`````

##minions##

Minions can provide a wide range of capabilities.  Minion capabilities are defined by the "libraries" included in their minion.js code.  If a minion receives a job that it can't process due to lack of capability, this triggers an exception and the job is returned to the strawboss to be picked up by another node.
