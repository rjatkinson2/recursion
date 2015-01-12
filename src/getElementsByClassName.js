// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  var matches = [];
  var childNodes = (arguments[1]) ? arguments[1].childNodes : document.body.childNodes;
  for (var i = 0; i < childNodes.length; i++) {
    if(childNodes[i] instanceof HTMLElement && childNodes[i].classList[0] === className){
      matches.push(childNodes[i]);
    }
    if(childNodes[i].childElementCount > 0){
      var childMatches = (getElementsByClassName(className, childNodes[i]));
      for (var j = 0; j < childMatches.length; j++) {
        if(childMatches[j]){
          matches.push(childMatches[j]);
        }
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