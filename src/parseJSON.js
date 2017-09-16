// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  let result;
  let firstChar = json[0];
  let lastChar = json[json.length - 1];

  if (firstChar === '{' && lastChar === '}') {
  	result = {};
  	json = json.slice(1, json.length - 1);
  	if(json.length > 1) {
  	  
  	  let keys = [];
  	  let values = [];
  	  while (json.length > 0) {
  	    let indexEnd = 0;
  	    indexEnd = json.indexOf('":') + 1;
  	    keys.push(json.slice(0, indexEnd));
  	    
  	    if(json[indexEnd + 1] === ' ') {
  	      json = json.slice(indexEnd + 2);
  	    } else {
  	      json = json.slice(indexEnd + 1);
  	    }

  	    if(json[0] === '[') {
  	      indexEnd = json.indexOf(']') + 1;
  	    } else if(json[0] === '{') {
  	      indexEnd = json.indexOf('}') + 1;
  	    } else {
  	      indexEnd = json.indexOf(',');
  	    }
  	    
  	    if (indexEnd !== -1) {
  	      values.push(json.slice(0, indexEnd));
  	      if(json[indexEnd + 1] === ' ') {
  	        json = json.slice(indexEnd + 2);
  	      } else {
  	        json = json.slice(indexEnd + 1);
  	      }
  	    } else {
  	      if (json[json.length - 1] === ' ') {
  	        values.push(json.slice(0, json.length - 1));
  	      } else {
  	        values.push(json.slice());
  	      }
  	      json = '';
  	    }
  	  }
  		for (let i = 0; i < keys.length; i++) {
  		  let key = parseJSON(keys[i]);
  		  let value = parseJSON(values[i]);
  		  result[key] = value;
  		}
  	}
  } else if (firstChar === '[' && lastChar === ']') {
  	result = [];
  	json = json.slice(1, json.length - 1);
  	if(json.length > 1) {
  		let elements = json.split(',');
  		for (let element of elements) {
  			if(element[0] === ' ') {
  				element = element.slice(1);
  			}
  			result.push(parseJSON(element));
  		}
  	}
  } else if (firstChar === '"' && lastChar === '"') {
  	result = '';
  	json = json.slice(1, json.length - 1);
  	for (let i = 0; i < json.length; i++) {
  	  if(json[i] === '\\') {
  	    if(json[i + 1] === '\\' && json[i + 2] === '\\') {
  	      result += '\\';
  	      i++;
  	    } else if (json[i + 1] === '\\' && json[i + 2] === '\"') {
  	      result += '\"';
  	      i = i + 2;
  	    }
  	  } else {
  	    result += json[i];
  	  }
  	}
  } else if (json === 'true') {
  	return true;
  } else if (json === 'false') {
  	return false;
  } else if (json === 'null') {
  	return null;
  } else if (typeof(+json) === 'number') {
  	result = +json;
  }
  return result;
};
