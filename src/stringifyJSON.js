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

  //objects

  
  //booleans
  if(typeof obj === 'boolean'){
    return (obj) ? 'true' : 'false';
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

  return obj;

  //search through the entire object
  //strip quotes out of entire object
  //add double quotes to everything that requires quotes
    //everything prior to a colon if inside of a single bracket
  //concatenate using single quotes
  //work on edge cases
  
  //debug(typeof '{x:4,"monkey":"baller","chicken":"dinner",6:"theWin","z":55,a:"fifty-five"}');
  
  //Properties of non-array objects are not guaranteed to be stringified in any particular order. Do not rely on ordering of properties within the same object within the stringification.
  //Boolean, Number, and String objects are converted to the corresponding primitive values during stringification, in accord with the traditional conversion semantics.
  //If undefined, a function, or a symbol is encountered during conversion it is either omitted (when it is found in an object) or censored to null (when it is found in an array).
  //All symbol-keyed properties will be completely ignored, even when using the replacer function.
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
debug(JSON.stringify({ x: 5 }));                  // '{"x":5}'
debug(stringifyJSON({ x: 5 }));                   // '{"x":5}'
debug(typeof JSON.stringify({ x: 5 }));                  // '{"x":5}'
debug(typeof stringifyJSON({ x: 5 }));                   // '{"x":5}'
