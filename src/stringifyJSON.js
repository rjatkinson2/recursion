// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don"t so you"re going to write it from scratch:

var stringifyJSON = function(obj) {
  //numbers
  if(obj === undefined || typeof obj === 'function'){return undefined;}
  if(typeof obj === 'number'){
    var numToString = obj + "";
    return numToString;
  }

  //strings
  if(typeof obj === 'string'){
    return '"' + obj + '"';
  }

  //arrays
  if(obj instanceof Array){
    //just need to dig deeper into the array to evaluate recursively.
    var vals = [];
    for (var i = 0; i < obj.length; i++) {
      vals.push(stringifyJSON(obj[i]));
    };
    return "[" + vals.join(",") + "]";
  }

  //objects
  if(obj instanceof Object){
    var props = [];
    var keyValString = '';
    //look at each key value pair
    for(var key in obj){
      //handle the key stringification
      if(obj[key] !== undefined && typeof obj[key] !== 'function'){
        keyValString = '';
        keyValString += stringifyJSON(key);
        keyValString += ":";
        //handle the value stringification
        keyValString += stringifyJSON(obj[key]);
        //push each key value pair into an array
        props.push(keyValString);
      }
    }
    if(keyValString){
      return "{" + props.join(",") + "}";
    }
    return '{}';
  }

  
  //booleans
  if(typeof obj === 'boolean'){
    return (obj) ? 'true' : 'false';
  }

  if(obj === null){
    return 'null';
  }

  return obj;
};
