// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  //document.body - Returns the <body> or <frameset> node of the current document, or null if no such element exists.
  //element.childNodes - Returns the child elements of the selected node in the form of Array.
  //element.classList - classList returns a token list of the class attribute of the element.
  console.log(document.body);
  console.log(document.body.childNodes);
  console.log(document.body.classList); 
};

getElementsByClassName('targetClassName');