// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  var matches = [];
  var childNodes = (arguments[1]) ? arguments[1].childNodes : document.childNodes;
  for (var i = 0; i < childNodes.length; i++) {
    var classMatches = false;
    var childNode = childNodes[i];
    if(childNode.classList){
      for (var j = 0; j < childNode.classList.length; j++) {
        if(childNode.classList[j] === className){classMatches = true;}
      };
    }
    if(classMatches === true){
      matches.push(childNode);
    }
    if(childNode.childElementCount > 0){
      var childMatches = (getElementsByClassName(className, childNode));
      for (var k = 0; k < childMatches.length; k++) {
        matches.push(childMatches[k]);
      }
    }
  }return matches;
};