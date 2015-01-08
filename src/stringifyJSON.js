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

  if(obj === null){
    return 'null';
  }

  return obj;
};



  debug(JSON.stringify(9)===stringifyJSON(9));
  debug(JSON.stringify(null)===stringifyJSON(null));
  debug(typeof JSON.stringify(null));
  debug(typeof stringifyJSON(null));
  debug(JSON.stringify(true)===stringifyJSON(true));
  debug(JSON.stringify(false)===stringifyJSON(false));
  debug(JSON.stringify("Hello world")===stringifyJSON("Hello world"));
  debug(JSON.stringify([])===stringifyJSON([]));
  debug(JSON.stringify([8])===stringifyJSON([8]));
  debug(JSON.stringify(["hi"])===stringifyJSON(["hi"]));
  debug(JSON.stringify([8, "hi"])===stringifyJSON([8, "hi"]));
  debug(JSON.stringify([1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999])===stringifyJSON([1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]));
  debug(JSON.stringify([8, [[],3,4]])===stringifyJSON([8, [[],3,4]]));
  debug(JSON.stringify([[[["foo"]]]])===stringifyJSON([[[["foo"]]]]));
  debug(JSON.stringify({})===stringifyJSON({}));
  debug(JSON.stringify({})===stringifyJSON({"a": "apple"}));
  debug(JSON.stringify({"a": "apple"})===stringifyJSON());
  debug(JSON.stringify({"foo": true, "bar": false, "baz": null})===stringifyJSON({"foo": true, "bar": false, "baz": null}));
  debug(JSON.stringify({"boolean, true": true, "boolean, false": false, "null": null })===stringifyJSON({"boolean, true": true, "boolean, false": false, "null": null }));
  debug(JSON.stringify({"a":{"b":"c"}})===stringifyJSON({"a":{"b":"c"}}));
  debug(JSON.stringify({"a":["b", "c"]})===stringifyJSON({"a":["b", "c"]}));
  debug(JSON.stringify([{"a":"b"}, {"c":"d"}])===stringifyJSON([{"a":"b"}, {"c":"d"}]));
  debug(JSON.stringify({"a":[],"c": {}, "b": true})===stringifyJSON({"a":[],"c": {}, "b": true}));


/*
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

*/
