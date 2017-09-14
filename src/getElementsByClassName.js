// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
) {
  // your code here
  var elementArray = [];
  var body = document.body;
  var getElements = function (node) {
  	if(node.classList && node.classList.contains(className)) {
  		elementArray.push(node);
  	}
  	if (node.hasChildNodes()) {
  		var  children = node.childNodes;
  		for (let i = 0; i < children.length; i++) {
  			getElements(children[i])
  		};
  	}
  }
  getElements(body);
  return elementArray;
};
