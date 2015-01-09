// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  //Returns an array-like object of all child elements which have all of the given class names. When called on the document object, the complete document is searched, including the root node. You may also call getElementsByClassName() on any element; it will return only elements which are descendants of the specified root element with the given class names.
  //document.body - Returns the <body> or <frameset> node of the current document, or null if no such element exists.
  //element.childNodes - Returns the child elements of the selected node in the form of Array.  Child nodes appear to be shown in an array listed by just there tag <p> is shown as p.  If there's nothing inside, it will just be a p, but if there's stuff inside it will be p <stuff> p in the array's order. The array is one-level but represents multi-level html.
  //element.classList - classList returns a token list of the class attribute of the element.
  //console.log(document.body);
  //console.log(document.body.childNodes);
  //console.log(document.body.classList);
  var childNodeArray = document.body.childNodes;
  var matches = [];
  for (var i = 0; i < childNodeArray.length; i++) {
  	var cList = childNodeArray[i].classList;
  	if(cList){
  		if(cList.length){
  			for (var j = 0; j < cList.length; j++) {
  				if(cList[j]===className){matches.push(childNodeArray[i]);}
  			}
  		}
  	}
  }
  return(matches);
};

console.log(getElementsByClassName('targetClassName'));