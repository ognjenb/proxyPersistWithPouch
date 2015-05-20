var Reflect = require('harmony-reflect');
var PouchDB = require('pouchDB');
var present = require('present');

var db = new PouchDB("testdb");

var simpleObj = {
	a : "a",
	b : "b"
};

var proxy = new Proxy(simpleObj, {
	get: function(realObj, prop, receiver) {
		
		//releasing promise check, is there a better solution?
 	  	if (prop=="then") {
 	  		return undefined;
 	  	}

 	  	return realObj[prop];
	}
})

var toinsert = {
	_id : present()+"",
	data : proxy
}

db.put(toinsert, function(error, response) {
	if (error) {
      
      console.error("[DB persist error]: "+error);
      return;
    
    } else if(response && response.ok) {
      
      console.log("Inserted.")
    
    }
});

console.log("access a: " + proxy.a);