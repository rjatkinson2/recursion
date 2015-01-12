// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  var matches = [];
  var childNodes = (arguments[1]) ? arguments[1].childNodes : document.body.childNodes;
  for (var i = 0; i < childNodes.length; i++) {
    var classMatches = false;
    if(childNodes[i].classList){
      for (var j = 0; j < childNodes[i].classList.length; j++) {
        if(childNodes[i].classList[j] === className){classMatches = true;}
      };
    }
    if(childNodes[i] instanceof HTMLElement && classMatches === true){
      matches.push(childNodes[i]);
    }
    if(childNodes[i].childElementCount > 0){
      var childMatches = (getElementsByClassName(className, childNodes[i]));
      for (var k = 0; k < childMatches.length; k++) {
        matches.push(childMatches[k]);
      }
    }
  }return matches;
};
getElementsByClassName('targetClassName');
console.log('---testing---');
//console.log(document.getElementsByClassName('targetClassName') === getElementsByClassName('targetClassName'));
console.log('---prototype---');
console.log(document.getElementsByClassName('targetClassName'));
console.log('---myFunction---');
console.log(getElementsByClassName('targetClassName'));