// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  var outer = json.slice(0,1) + json.slice(json.length-1,json.length);
  var inner = json.slice(1,json.length-1);

  //handle null
  if(json === 'null'){
    return null;
  }

  //handle booleans
  if(json === 'true' || json === 'false'){
    return (json === 'true') ? true : false;
  }
  
  //handle numbers
  if(!isNaN(json)){
    return Number(json);
  }

  //handle objects
  if(outer === '{}'){
    newObject = {};
    var keyVals = parseDivider(inner,',');

    //handle key-value pairs
    var keyVal;
    for (var i = 0; i < keyVals.length; i++) {
      keyVal = parseDivider(keyVals[i],':');
      newObject[parseJSON(keyVal[0])] = parseJSON(keyVal[1]);
    }
    return newObject;
  }

  //handle arrays
  if(outer === '[]'){
    newArray = [];
    var vals = parseDivider(inner,',');
    for (var i = 0; i < vals.length; i++) {
      newArray.push(parseJSON(vals[i]));
    }
    return newArray;
  }

  //everything else
  if(typeof inner === 'string'){
    return inner;
  }

  //parseDivider is a utility function that searches for a divider and breaks the string up into an array of values demonstrated by the specified divider. The function makes sure the divider is skipped if it exists inside of a string.
  function parseDivider(str,div){
    var pairs = [], lastComma = 0, numInside = 0, skip = 0;
    //count commas to determine number of objects inside the object.
    for (var i = 0; i < str.length; i++) {
      if(str.charAt(i) === "'"){
        skip++;
      }
      if(str.charAt(i) === div && skip % 2 === 0){
        pairs.push(str.slice(lastComma,i));
        lastComma = i+1;
        numInside++;
      }
    }
    if(numInside > 0){
      pairs.push(str.slice(lastComma,str.length));
      numInside++;
    }
    return pairs;
  }
  return json;
};

console.log(parseJSON("[4,5,'girl',false]"));
parseJSON("{'a,bc':5,'def':14,'ghi':true,monkey:boy}");

console.log('==== test stuff ====');
console.log(JSON.parse('[4,5,"girl",false]'));
console.log(JSON.parse('{}'));                 // {}  object
console.log(parseJSON('{}'));                 // {}  object
console.log(JSON.parse('true'));               // true  boolean
console.log(parseJSON('true'));               // true  boolean
console.log(JSON.parse('"foo"'));              // "foo"  string
console.log(parseJSON('"foo"'));              // "foo"  string
console.log(JSON.parse('[1, 5, "false"]'));    // [1, 5, "false"]  object
console.log(parseJSON('[1, 5, "false"]'));    // [1, 5, "false"]  object
console.log(JSON.parse('null'));               // null  object
console.log(parseJSON('null'));               // null  string
console.log(JSON.parse('{"1": 1, "2": 2}'));   //Object {1: 1, 2: 2}  object
console.log(parseJSON('{"1": 1, "2": 2}'));   //Object {1: 1, 2: 2}  string



