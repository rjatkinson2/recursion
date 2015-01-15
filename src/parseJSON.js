// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  var notSet = true;
  for (var i = 0; i < json.length; i++) {
    if(notSet && json.charAt(i) !== ' '){
      var start = i;
      notSet = false;
    }
  }

  var backNotSet = true;
  for (var j = json.length - 1; j >= 0; j--) {
    if(backNotSet && json.charAt(j) !== ' '){
      var end = j+1;
      backNotSet = false;
    }
  };

  var inner, outer, jsonNWS;
  jsonNWS = json.slice(start,end);
  outer = json.slice(start,start+1) + json.slice(end-1,end);
  inner = json.slice(start+1,end-1);

  if(json.length === 1){
    outer = '""';
    inner = json;
  }

  //handle null
  if(jsonNWS === 'null' || jsonNWS === null){
    return null;
  }

  //handle booleans
  if(jsonNWS === 'true' || jsonNWS === 'false'){
    return (jsonNWS === 'true') ? true : false;
  }
  
  //handle numbers
  if(!isNaN(json)){
    return Number(json);
  }

  //handle objects
  if(outer === '{}'){
    var newObject = {};
    if(inner === ''){return newObject;}
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
    var newArray = [];
    if(inner === ''){return newArray;}
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
    var pairs = [], lastComma = 0, numInside = 0, skip = 0, skipOb = 0, skipArr = 0;
    //count commas to determine number of objects inside the object.
    for (var i = 0; i < str.length; i++) {
      if(str.charAt(i) === '{'){skipOb++;}
      if(str.charAt(i) === '}'){skipOb--;}
      if(str.charAt(i) === '['){skipArr++;}
      if(str.charAt(i) === ']'){skipArr--;}
      if(str.charAt(i) === '"'){skip++;}
      if(str.charAt(i) === div && skip % 2 === 0 && skipOb === 0 && skipArr === 0){
        pairs.push(str.slice(lastComma,i));
        lastComma = i+1;
        numInside++;
      }
    }
    if(numInside > 0){
      pairs.push(str.slice(lastComma,str.length));
      numInside++;
    }else{
      pairs.push(str);
    }
    return pairs;
  }
  return json;
};

console.log(JSON.parse('[]'));
console.log(parseJSON('[]'));
console.log(JSON.parse('{"foo": ""}'));
console.log(parseJSON('{"foo": ""}'));
console.log(JSON.parse('{}'));
console.log(parseJSON('{}'));
console.log(JSON.parse('{"foo": "bar"}'));
console.log(parseJSON('{"foo": "bar"}'));
console.log(JSON.parse('["one", "two"]'));
console.log(parseJSON('["one", "two"]'));
console.log(JSON.parse('{"a": "b", "c": "d"}'));
console.log(parseJSON('{"a": "b", "c": "d"}'));
console.log(JSON.parse('[null,false,true]'));
console.log(parseJSON('[null,false,true]'));
console.log(JSON.parse('{"foo": true, "bar": false, "baz": null}'));
console.log(parseJSON('{"foo": true, "bar": false, "baz": null}'));
console.log(JSON.parse('[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]'));
console.log(parseJSON('[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]'));
console.log(JSON.parse('{"boolean, true": true, "boolean, false": false , "null": null }'));
console.log(parseJSON('{"boolean, true": true, "boolean, false": false , "null": null }'));
// basic nestin
console.log(JSON.parse('{"a":{"b":"c"}}'));
console.log(parseJSON('{"a":{"b":"c"}}'));
console.log(JSON.parse('{"a":["b", "c"]}'));
console.log(parseJSON('{"a":["b", "c"]}'));
console.log(JSON.parse('[{"a":"b"}, {"c":"d"}]'));
console.log(parseJSON('[{"a":"b"}, {"c":"d"}]'));
console.log(JSON.parse('{"a":[],"c": {}, "b": true}'));
console.log(parseJSON('{"a":[],"c": {}, "b": true}'));
console.log(JSON.parse('[[[["foo"]]]]'));
console.log(parseJSON('[[[["foo"]]]]'));
// escapin
console.log(JSON.parse('["\\\\\\"\\"a\\""]'));
console.log(parseJSON('["\\\\\\"\\"a\\""]'));
console.log(JSON.parse('["and you can\'t escape thi\s"]'));
console.log(parseJSON('["and you can\'t escape thi\s"]'));

console.log('==== my stuff ====');
console.log(JSON.parse('[4,5,"girl",false]'));
console.log(parseJSON('[4,5,"girl",false]'));
console.log(JSON.parse('{"a,bc":5,"de:f":14,"ghi":true,"monkey": "boy"}'));
console.log(parseJSON('{"a,bc":5,"de:f":14,"ghi":true,"monkey": "boy"}'));

console.log('==== test stuff ====');
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
console.log(JSON.parse('{"1": 1, "2": 2, "a":  "a"}'));   //Object {1: 1, 2: 2}  object
console.log(parseJSON('{"1": 1, "2": 2, "b":  "a"}'));   //Object {1: 1, 2: 2}  string



