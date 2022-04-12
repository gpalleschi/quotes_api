const Constants = require('./constants');

const checkNumeric = ( value ) => {
	let ret = true
	if ( typeof value != 'undefined' ) {
	  if ( !isNaN(value) ) {
	     ret = true;	
          } else {
	     ret = false;	
  	  }
	}

	return ret;
}

const checkParam = (name, value, values=[], mandatory=false) => {
	const ret = { error: null};

	if ( typeof value === 'undefined' ) {
		if ( mandatory ) {
		   ret.error = 'Parameter ' + name + ' is not present.';
		}
	} else {
		if ( values.length ) {
                   if ( values.includes(value) === false ) {
		      ret.error = 'Parameter ' + name + ' value ' + value + ' not managed.';
		   }
		}
	}	
	return ret;
}

module.exports = {
     checkParam: checkParam,
     checkNumeric: checkNumeric
};