// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don"t so you"re going to write it from scratch:

var stringifyJSON = function(obj) {
  //numbers
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
      keyValString = '';
      keyValString += stringifyJSON(key);
      keyValString += ":";
      //handle the value stringification
      keyValString += stringifyJSON(obj[key]);
      //push each key value pair into an array
      props.push(keyValString);
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

  return obj;
};

debug('----numbers----');
debug(JSON.stringify(56));                        // '{}'
debug(stringifyJSON(56));                         // '{}'
debug(typeof JSON.stringify(56));                        // '{}'
debug(typeof stringifyJSON(56));                         // '{}'
debug('----objects - blank----');
debug(JSON.stringify({}));                        // '{}'
debug(stringifyJSON({}));                         // '{}'
debug(typeof JSON.stringify({}));                        // '{}'
debug(typeof stringifyJSON({}));                         // '{}'
debug('----booleans----');
debug(JSON.stringify(true));                      // 'true'
debug(stringifyJSON(true));                       // 'true'
debug(typeof JSON.stringify(true));                      // 'true'
debug(typeof stringifyJSON(true));                       // 'true'
debug('----strings-----');
debug(JSON.stringify("foo"));                     // '"foo"'
debug(stringifyJSON("foo"));                      // '"foo"'
debug(typeof JSON.stringify("foo"));                     // '"foo"'
debug(typeof stringifyJSON("foo"));                      // '"foo"'
debug('----arrays-----');
debug(JSON.stringify([1, "false", false]));       // '[1,"false",false]'
debug(stringifyJSON([1, "false", false]));        // '[1,"false",false]'
debug(typeof JSON.stringify([1, "false", false]));       // '[1,"false",false]'
debug(typeof stringifyJSON([1, "false", false]));        // '[1,"false",false]'
debug('----objects-full----');
debug(JSON.stringify({ x: 5, "y":9 }));                  // '{"x":5}'
debug(stringifyJSON({ x: 5, "y":9 }));                   // '{"x":5}'
debug(typeof JSON.stringify({ x: 5, "y":9 }));                  // '{"x":5}'
debug(typeof stringifyJSON({ x: 5, "y":9 }));                   // '{"x":5}'
