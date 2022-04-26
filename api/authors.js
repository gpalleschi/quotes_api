const Constants = require('../controllers/constants');
const Db = require('../controllers/db');
const Check = require('../controllers/check');
const Utility = require('../controllers/utility');

export default async function handler (req, res) {
	const { language, search } = req.query;
	const ret = Check.checkParam('language', language, Constants.LANGUAGES, true);

	if ( ret.error ) {
           res.status(401).json(Utility.formatErr(401,'authors',ret.error));
	   return;
	} 

	if ( Db.connection() === null ) {
           res.status(401).json(Utility.formatErr(401,'authors','Error in DB Connection.'));
	   return;
	}

	const retAuthors = await Db.getAuthors(language, search);

	if ( retAuthors.error === null ) {
	   res.status(200).json(retAuthors.data);		
	} else {
           res.status(401).json(retAuthors.error);
	}
};