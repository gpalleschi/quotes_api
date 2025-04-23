import Constants from '../controllers/constants.js';
import Db        from '../controllers/db.js';
import {checkParam, checkNumeric }     from '../controllers/check.js';
import {formatErr}   from '../controllers/utility.js';

export default async function handler (req, res) {
	const { language, author, limit } = req.query;
	let ret = null;

	ret = checkParam('language', language, Constants.LANGUAGES, true);
	if ( ret.error ) {
           res.status(401).json(formatErr(401,'quotes',ret.error));
	   return;
	} 

	ret = checkParam('author', author, [], true);
	if ( ret.error ) {
           res.status(401).json(formatErr(401,'quotes',ret.error));
	   return;
	}

	if ( limit ) {
	   if ( !checkNumeric(limit) ) {
	      res.status(400).json(formatErr(401,'quotes','Error limit not numeric.'));
	      return;   	
   	   }
	}

	if ( Db.connection() === null ) {
           res.status(401).json(formatErr(401,'quotes','Error in DB Connection.'));
	   return;
	}	

	const retQuotes = await Db.getQuotes(language, author, limit);
	if ( retQuotes.error === null ) {
	   res.status(200).json(retQuotes.data);		
	} else {
           res.status(401).json(retQuotes.error);
	}	

};