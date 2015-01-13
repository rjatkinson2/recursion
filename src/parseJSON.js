// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  var outer = json.slice(0,1) + json.slice(json.length-1,json.length);
  //identify objects
    if(outer === '{}'){debug('its an object');}
  //identify arrays
    if(outer === '[]'){debug('its an array');}
  //everything else
};
parseJSON('[asdfasdfasdfasdfasdfsdf]');

debug('==== test stuff ====')
debug(JSON.parse('{}'));                 // {}
debug(JSON.parse('true'));               // true
debug(JSON.parse('"foo"'));              // "foo"
debug(JSON.parse('[1, 5, "false"]'));    // [1, 5, "false"]
debug(JSON.parse('null'));               // null
debug(JSON.parse('{"1": 1, "2": 2}'));   //Object {1: 1, 2: 2}