const Constants = require('../controllers/constants');
const Db = require('../controllers/db');
const Check = require('../controllers/check');
const Utility = require('../controllers/utility');

export default async function handler (req, res) {
	const { language, author, limit } = req.query;
	let ret = null;

	ret = Check.checkParam('language', language, Constants.LANGUAGES, true);
	if ( ret.error ) {
           res.status(401).json(Utility.formatErr(401,'quotes',ret.error));
	   return;
	} 

	ret = Check.checkParam('author', author, [], true);
	if ( ret.error ) {
           res.status(401).json(Utility.formatErr(401,'quotes',ret.error));
	   return;
	}

	if ( limit ) {
	   if ( !Check.checkNumeric(limit) ) {
	      res.status(400).json(Utility.formatErr(401,'quotes','Error limit not numeric.'));
	      return;   	
   	   }
	}

	if ( Db.connection() === null ) {
           res.status(401).json(Utility.formatErr(401,'quotes','Error in DB Connection.'));
	   return;
	}	

	const retQuotes = await Db.getQuotes(language, author, limit);
	if ( retQuotes.error === null ) {
	   res.status(200).json(retQuotes.data);		
	} else {
           res.status(401).json(retQuotes.error);
	}	

};