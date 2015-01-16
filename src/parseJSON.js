// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  var escapeFlag = false;
  var notSet = true;
  var checkObj = 0, checkArray = 0;
  for (var i = 0; i < json.length; i++) {
    var c = json.charAt(i);
    if(notSet && json.charAt(i) !== ' ' && c !== '\b' && c !== '\f' && c !== '\n' && c !== '\r' && c !== '\t'){
      var start = i;
      notSet = false;
    }
    if(json.charAt(i) === '\\'){
      escapeFlag = true;
    }
    if(json.charAt(i) === '{'){checkObj++;}
    if(json.charAt(i) === '}'){
      if(checkObj < 1){throw(SyntaxError());}
      checkObj--;
    }
    if(json.charAt(i) === '['){checkArray++;}
    if(json.charAt(i) === ']'){
      if(checkArray < 1){throw(SyntaxError());}
      checkArray--;
    }
    if(i === json.length-1 && (checkObj !== 0 || checkArray !== 0)){
      throw(SyntaxError());
    }
  }

  var backNotSet = true;
  for (var j = json.length - 1; j >= 0; j--) {
    var c = json.charAt(j);
    if(backNotSet && json.charAt(j) !== ' ' && c !== '\b' && c !== '\f' && c !== '\n' && c !== '\r' && c !== '\t'){
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
    inner = jsonNWS;
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
    for (var k = 0; k < keyVals.length; k++) {
      keyVal = parseDivider(keyVals[k],':');
      newObject[parseJSON(keyVal[0])] = parseJSON(keyVal[1]);
    }
    return newObject;
  }

  //handle arrays
  if(outer === '[]'){
    var newArray = [];
    if(inner === ''){return newArray;}
    var vals = parseDivider(inner,',');
    for (var l = 0; l < vals.length; l++) {
      newArray.push(parseJSON(vals[l]));
    }
    return newArray;
  }

  //handle escapes
  if(escapeFlag){
    var newString = [];
    for (var m = inner.length - 1; m >= 0; m--) {
      var c = inner.charAt(m);
      if((inner.charAt(m)!== '\\' || 
        (inner.charAt(m) === '\\' && inner.charAt(m+1) !=='\\' && inner.charAt(m-1) === '\\')) &&
        (c !== '\b' && c !== '\f' && c !== '\n' && c !== '\r' && c !== '\t')
        ){
        newString.unshift(inner.charAt(m));
      }
    }
    return newString.join('');
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


console.log(_.isEqual(JSON.parse('[]'),parseJSON('[]')));
console.log(_.isEqual(JSON.parse('{"foo": ""}'),parseJSON('{"foo": ""}')));
console.log(_.isEqual(JSON.parse('{}'),parseJSON('{}')));
console.log(_.isEqual(JSON.parse('{"foo": "bar"}'),parseJSON('{"foo": "bar"}')));
console.log(_.isEqual(JSON.parse('["one", "two"]'),parseJSON('["one", "two"]')));
console.log(_.isEqual(JSON.parse('{"a": "b", "c": "d"}'),parseJSON('{"a": "b", "c": "d"}')));
console.log(_.isEqual(JSON.parse('[null,false,true]'),parseJSON('[null,false,true]')));
console.log(_.isEqual(JSON.parse('{"foo": true, "bar": false, "baz": null}'),parseJSON('{"foo": true, "bar": false, "baz": null}')));
console.log(_.isEqual(JSON.parse('[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]'),parseJSON('[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]')));
console.log(_.isEqual(JSON.parse('{"boolean, true": true, "boolean, false": false , "null": null }'),parseJSON('{"boolean, true": true, "boolean, false": false , "null": null }')));


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

console.log(_.isEqual(JSON.parse('{"a":{"b":"c"}}'),parseJSON('{"a":{"b":"c"}}')));
console.log(_.isEqual(JSON.parse('{"a":["b", "c"]}'),parseJSON('{"a":["b", "c"]}')));
console.log(_.isEqual(JSON.parse('[{"a":"b"}, {"c":"d"}]'),parseJSON('[{"a":"b"}, {"c":"d"}]')));
console.log(_.isEqual(JSON.parse('{"a":[],"c": {}, "b": true}'),parseJSON('{"a":[],"c": {}, "b": true}')));
console.log(_.isEqual(JSON.parse('[[[["foo"]]]]'),parseJSON('[[[["foo"]]]]')));

// escapin
console.log(JSON.parse('["\\\\\\"\\"a\\""]'));
console.log(parseJSON('["\\\\\\"\\"a\\""]'));
console.log(JSON.parse('["and you can\'t escape thi\s"]'));
console.log(parseJSON('["and you can\'t escape thi\s"]'));

console.log(_.isEqual(JSON.parse('["\\\\\\"\\"a\\""]'),parseJSON('["\\\\\\"\\"a\\""]')));
console.log(_.isEqual(JSON.parse('["and you can\'t escape thi\s"]'),parseJSON('["and you can\'t escape thi\s"]')));

console.log('==== my stuff ====');
console.log(JSON.parse('[4,5,"girl",false]'));
console.log(parseJSON('[4,5,"girl",false]'));
console.log(JSON.parse('{"a,bc":5,"de:f":14,"ghi":true,"monkey": "boy"}'));
console.log(parseJSON('{"a,bc":5,"de:f":14,"ghi":true,"monkey": "boy"}'));

console.log('==== test stuff ====');
console.log(JSON.parse('{}'));                 // {}  object
console.log(parseJSON('{}'));                 // {}  object
console.log(JSON.parse('{}') === '{}');
console.log(JSON.parse('true'));               // true  boolean
console.log(parseJSON('true'));               // true  boolean
console.log(JSON.parse('true')===parseJSON('true'));
console.log(JSON.parse('"foo"'));              // "foo"  string
console.log(parseJSON('"foo"'));              // "foo"  string
console.log(JSON.parse('"foo"')===parseJSON('"foo"'));
console.log(JSON.parse('[1, 5, "false"]'));    // [1, 5, "false"]  object
console.log(parseJSON('[1, 5, "false"]'));    // [1, 5, "false"]  object
console.log(JSON.parse('[1, 5, "false"]')===parseJSON('[1, 5, "false"]'));
console.log(JSON.parse('null'));               // null  object
console.log(parseJSON('null'));               // null  string
console.log(JSON.parse('null')===parseJSON('null'));
console.log(JSON.parse('{"1": 1, "2": 2, "a":  "a"}'));   //Object {1: 1, 2: 2}  object
console.log(parseJSON('{"1": 1, "2": 2, "b":  "a"}'));   //Object {1: 1, 2: 2}  string
console.log(_.isEqual(JSON.parse('{"1": 1, "2": 2, "a":  "a"}'),JSON.parse('{"1": 1, "2": 2, "a":  "a"}')));

console.log(_.isEqual(JSON.parse('{"CoreletAPIVersion":2,"CoreletType":"standalone",' +
    '"documentation":"A corelet that provides the capability to upload' +
    ' a folderâ€™s contents into a userâ€™s locker.","functions":[' +
    '{"documentation":"Displays a dialog box that allows user to ' +
    'select a folder on the local system.","name":' +
    '"ShowBrowseDialog","parameters":[{"documentation":"The ' +
    'callback function for results.","name":"callback","required":' +
    'true,"type":"callback"}]},{"documentation":"Uploads all mp3 files' +
    ' in the folder provided.","name":"UploadFolder","parameters":' +
    '[{"documentation":"The path to upload mp3 files from."' +
    ',"name":"path","required":true,"type":"string"},{"documentation":' +
    ' "The callback function for progress.","name":"callback",' +
    '"required":true,"type":"callback"}]},{"documentation":"Returns' +
    ' the server name to the current locker service.",' +
    '"name":"GetLockerService","parameters":[]},{"documentation":' +
    '"Changes the name of the locker service.","name":"SetLockerSer' +
    'vice","parameters":[{"documentation":"The value of the locker' +
    ' service to set active.","name":"LockerService","required":true' +
    ',"type":"string"}]},{"documentation":"Downloads locker files to' +
    ' the suggested folder.","name":"DownloadFile","parameters":[{"' +
    'documentation":"The origin path of the locker file.",' +
    '"name":"path","required":true,"type":"string"},{"documentation"' +
    ':"The Window destination path of the locker file.",' +
    '"name":"destination","required":true,"type":"integer"},{"docum' +
    'entation":"The callback function for progress.","name":' +
    '"callback","required":true,"type":"callback"}]}],' +
    '"name":"LockerUploader","version":{"major":0,' +
    '"micro":1,"minor":0},"versionString":"0.0.1"}',
  '{ "firstName": "John", "lastName" : "Smith", "age" : ' +
    '25, "address" : { "streetAddress": "21 2nd Street", ' +
    '"city" : "New York", "state" : "NY", "postalCode" : ' +
    ' "10021" }, "phoneNumber": [ { "type" : "home", ' +
    '"number": "212 555-1234" }, { "type" : "fax", ' +
    '"number": "646 555-4567" } ] }'),parseJSON('{"CoreletAPIVersion":2,"CoreletType":"standalone",' +
    '"documentation":"A corelet that provides the capability to upload' +
    ' a folderâ€™s contents into a userâ€™s locker.","functions":[' +
    '{"documentation":"Displays a dialog box that allows user to ' +
    'select a folder on the local system.","name":' +
    '"ShowBrowseDialog","parameters":[{"documentation":"The ' +
    'callback function for results.","name":"callback","required":' +
    'true,"type":"callback"}]},{"documentation":"Uploads all mp3 files' +
    ' in the folder provided.","name":"UploadFolder","parameters":' +
    '[{"documentation":"The path to upload mp3 files from."' +
    ',"name":"path","required":true,"type":"string"},{"documentation":' +
    ' "The callback function for progress.","name":"callback",' +
    '"required":true,"type":"callback"}]},{"documentation":"Returns' +
    ' the server name to the current locker service.",' +
    '"name":"GetLockerService","parameters":[]},{"documentation":' +
    '"Changes the name of the locker service.","name":"SetLockerSer' +
    'vice","parameters":[{"documentation":"The value of the locker' +
    ' service to set active.","name":"LockerService","required":true' +
    ',"type":"string"}]},{"documentation":"Downloads locker files to' +
    ' the suggested folder.","name":"DownloadFile","parameters":[{"' +
    'documentation":"The origin path of the locker file.",' +
    '"name":"path","required":true,"type":"string"},{"documentation"' +
    ':"The Window destination path of the locker file.",' +
    '"name":"destination","required":true,"type":"integer"},{"docum' +
    'entation":"The callback function for progress.","name":' +
    '"callback","required":true,"type":"callback"}]}],' +
    '"name":"LockerUploader","version":{"major":0,' +
    '"micro":1,"minor":0},"versionString":"0.0.1"}',
  '{ "firstName": "John", "lastName" : "Smith", "age" : ' +
    '25, "address" : { "streetAddress": "21 2nd Street", ' +
    '"city" : "New York", "state" : "NY", "postalCode" : ' +
    ' "10021" }, "phoneNumber": [ { "type" : "home", ' +
    '"number": "212 555-1234" }, { "type" : "fax", ' +
    '"number": "646 555-4567" } ] }')));

console.log(_.isEqual(JSON.parse('{\r\n' +
    '          "glossary": {\n' +
    '              "title": "example glossary",\n\r' +
    '      \t\t"GlossDiv": {\r\n' +
    '                  "title": "S",\r\n' +
    '      \t\t\t"GlossList": {\r\n' +
    '                      "GlossEntry": {\r\n' +
    '                          "ID": "SGML",\r\n' +
    '      \t\t\t\t\t"SortAs": "SGML",\r\n' +
    '      \t\t\t\t\t"GlossTerm": "Standard Generalized ' +
    'Markup Language",\r\n' +
    '      \t\t\t\t\t"Acronym": "SGML",\r\n' +
    '      \t\t\t\t\t"Abbrev": "ISO 8879:1986",\r\n' +
    '      \t\t\t\t\t"GlossDef": {\r\n' +
    '                              "para": "A meta-markup language,' +
    ' used to create markup languages such as DocBook.",\r\n' +
    '      \t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]\r\n' +
    '                          },\r\n' +
    '      \t\t\t\t\t"GlossSee": "markup"\r\n' +
    '                      }\r\n' +
    '                  }\r\n' +
    '              }\r\n' +
    '          }\r\n' +
    '      }\r\n'),parseJSON('{\r\n' +
    '          "glossary": {\n' +
    '              "title": "example glossary",\n\r' +
    '      \t\t"GlossDiv": {\r\n' +
    '                  "title": "S",\r\n' +
    '      \t\t\t"GlossList": {\r\n' +
    '                      "GlossEntry": {\r\n' +
    '                          "ID": "SGML",\r\n' +
    '      \t\t\t\t\t"SortAs": "SGML",\r\n' +
    '      \t\t\t\t\t"GlossTerm": "Standard Generalized ' +
    'Markup Language",\r\n' +
    '      \t\t\t\t\t"Acronym": "SGML",\r\n' +
    '      \t\t\t\t\t"Abbrev": "ISO 8879:1986",\r\n' +
    '      \t\t\t\t\t"GlossDef": {\r\n' +
    '                              "para": "A meta-markup language,' +
    ' used to create markup languages such as DocBook.",\r\n' +
    '      \t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]\r\n' +
    '                          },\r\n' +
    '      \t\t\t\t\t"GlossSee": "markup"\r\n' +
    '                      }\r\n' +
    '                  }\r\n' +
    '              }\r\n' +
    '          }\r\n' +
    '      }\r\n')));

console.log(JSON.parse('{\r\n' +
    '          "glossary": {\n' +
    '              "title": "example glossary",\n\r' +
    '      \t\t"GlossDiv": {\r\n' +
    '                  "title": "S",\r\n' +
    '      \t\t\t"GlossList": {\r\n' +
    '                      "GlossEntry": {\r\n' +
    '                          "ID": "SGML",\r\n' +
    '      \t\t\t\t\t"SortAs": "SGML",\r\n' +
    '      \t\t\t\t\t"GlossTerm": "Standard Generalized ' +
    'Markup Language",\r\n' +
    '      \t\t\t\t\t"Acronym": "SGML",\r\n' +
    '      \t\t\t\t\t"Abbrev": "ISO 8879:1986",\r\n' +
    '      \t\t\t\t\t"GlossDef": {\r\n' +
    '                              "para": "A meta-markup language,' +
    ' used to create markup languages such as DocBook.",\r\n' +
    '      \t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]\r\n' +
    '                          },\r\n' +
    '      \t\t\t\t\t"GlossSee": "markup"\r\n' +
    '                      }\r\n' +
    '                  }\r\n' +
    '              }\r\n' +
    '          }\r\n' +
    '      }\r\n'));

console.log(parseJSON('{\r\n' +
    '          "glossary": {\n' +
    '              "title": "example glossary",\n\r' +
    '      \t\t"GlossDiv": {\r\n' +
    '                  "title": "S",\r\n' +
    '      \t\t\t"GlossList": {\r\n' +
    '                      "GlossEntry": {\r\n' +
    '                          "ID": "SGML",\r\n' +
    '      \t\t\t\t\t"SortAs": "SGML",\r\n' +
    '      \t\t\t\t\t"GlossTerm": "Standard Generalized ' +
    'Markup Language",\r\n' +
    '      \t\t\t\t\t"Acronym": "SGML",\r\n' +
    '      \t\t\t\t\t"Abbrev": "ISO 8879:1986",\r\n' +
    '      \t\t\t\t\t"GlossDef": {\r\n' +
    '                              "para": "A meta-markup language,' +
    ' used to create markup languages such as DocBook.",\r\n' +
    '      \t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]\r\n' +
    '                          },\r\n' +
    '      \t\t\t\t\t"GlossSee": "markup"\r\n' +
    '                      }\r\n' +
    '                  }\r\n' +
    '              }\r\n' +
    '          }\r\n' +
    '      }\r\n'));



    console.log(_.isEqual(JSON.parse('["foo",]] "bar"'),parseJSON('["foo",]] "bar"')));

    