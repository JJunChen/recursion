// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  var result = '';

  if(typeof(obj) === 'function' || typeof(obj) === 'undefined') {
  	return;
  }
  else if(Array.isArray(obj)) {
  	result += '[';
  	for(let i = 0; i < obj.length; i++) {
  		result += stringifyJSON(obj[i]);
  		if(i !== obj.length - 1) {
  			result += ',';
  		}
  	}
  	result += ']';

  }  else if (obj === null) {
  	result += null;

  } else if (typeof(obj) === 'object') {
  	result += '{'
  	var keyArray = Object.keys(obj);
  	if (keyArray.length > 0) {

  		for(let i = 0; i < keyArray.length; i++) {
  			if (keyArray[i] !== 'functions' && keyArray[i] !== 'undefined') {
  				result += stringifyJSON(keyArray[i]) + ':' + stringifyJSON(obj[keyArray[i]]);

  				if(i !== keyArray.length - 1) {
  					result += ',';
  				}
  			}
  		}
  	}
  	
  	result += '}';

  } else if(typeof(obj) === 'string') {
  	result += '"' + obj + '"';
  } else {
  	result += obj;
  }
  return result;
};
