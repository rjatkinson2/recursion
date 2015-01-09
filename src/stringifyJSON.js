// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don"t so you"re going to write it from scratch:

var stringifyJSON = function(obj) {

  if(obj === undefined || typeof obj === 'function'){return undefined;}
  if(obj === null){return 'null';}
  switch(typeof obj){
    case 'number': return obj + "";
    case 'string': return '"' + obj + '"';
    case 'boolean': return (obj) ? 'true' : 'false';
  }

  switch(obj.constructor){
    case Array:
      var vals = [];
      for (var i = 0; i < obj.length; i++) {
        vals.push(stringifyJSON(obj[i]));
      };
      return "[" + vals.join(",") + "]";
    case Object:
      var props = [];
      var keyValString;
      for(var key in obj){
        if(obj[key] !== undefined && typeof obj[key] !== 'function'){
          keyValString = '';
          keyValString += stringifyJSON(key) + ":" + stringifyJSON(obj[key]);
          props.push(keyValString);
        }
      }
      if(keyValString){return "{" + props.join(",") + "}";}
      return '{}';
  }
};