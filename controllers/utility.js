const formatErr = (errorCode, functionName, errorDesc) => {
	return ( { 'error' : errorCode,
	           'function' : functionName,
	           'description' : errorDesc
	});
}


module.exports = {
  formatErr : formatErr,
};