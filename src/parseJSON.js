// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  var outer = json.slice(0,1) + json.slice(json.length-1,json.length);
  var inner = json.slice(1,json.length-1);
  //identify objects
    if(outer === '{}'){
      debug('its an object');
      var numInside = 0;
      var skip = 0;
      //count commas to determine number of objects inside the object.
      for (var i = 0; i < inner.length; i++) {
        if(inner.charAt(i) === "'"){
          skip++;
        }
        if(inner.charAt(i) === ',' && skip % 2 === 0){
          numInside++;
        }
      }
      if(numInside > 0){
        numInside++;
      }
      debug(numInside);
    }
  //identify arrays
    if(outer === '[]'){
      debug('its an array');
    }
  //everything else
};
parseJSON("{'a,bc':5,'def':14,'ghi':false, monkey:boy}");

debug('==== test stuff ====')
debug(JSON.parse('{}'));                 // {}
debug(JSON.parse('true'));               // true
debug(JSON.parse('"foo"'));              // "foo"
debug(JSON.parse('[1, 5, "false"]'));    // [1, 5, "false"]
debug(JSON.parse('null'));               // null
debug(JSON.parse('{"1": 1, "2": 2}'));   //Object {1: 1, 2: 2}