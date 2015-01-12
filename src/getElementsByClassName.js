// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  /*//instantiate a blank array to store matches
  var matches = [];
  //instantiate a blank array for recursive children matches
  var childrenMatches = [];

  //instantiate the childNodeArray
  var childNodeArray;
  //generate an array with all of the parent node's child nodes. this is ONLY first children, no deeper.
  //if a parent node isn't specified by the second argument, use document.body
  if(!arguments[1]){childNodeArray = document.body.childNodes;}
  //otherwise, use the parent node specified by the second argument
  else{childNodeArray = arguments[1].childNodes;}
  //look at every child node
  for (var i = 0; i < childNodeArray.length; i++) {
    if(childNodeArray[i] instanceof HTMLElement){
      console.log(childNodeArray[i].nodeName);
      //if the child node is a DIV, look through it recursively. need to add any other types that create layers.
    	if(childNodeArray[i].nodeName === 'DIV' || childNodeArray[i].nodeName === 'P'){
    		childrenMatches.push(getElementsByClassName(className, childNodeArray[i])[0]);
        //console.log(childrenMatches);
    	}
      //console.log(childrenMatches);
      //store a list of classes associated with the node
    	var classList = childNodeArray[i].classList;
      //if the node has a classList, go onnnnnn
    	if(classList){
        //if the clasList has a length, or as classes basically, go onnn
    		if(classList.length){
          //loop through all of the classes
    			for (var j = 0; j < classList.length; j++) {
            //if any of the classes equal the listed class name, push the current node (childNode of the parent) to the matches array
    				if(classList[j]===className){matches.push(childNodeArray[i]);}
          }
        }
      }
    }
  }
  for (var i = 0; i < childrenMatches.length; i++) {
    matches.push(childrenMatches[i]);
  };
  return(matches);
  //console.log(childrenMatches);*/
};
getElementsByClassName('targetClassName');
console.log('---testing---')
console.log(document.getElementsByClassName('targetClassName') === getElementsByClassName('targetClassName'));
console.log(document.getElementsByClassName('targetClassName'));
console.log(getElementsByClassName('targetClassName'));