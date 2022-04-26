const Constants = require('../controllers/constants');
const Db = require('../controllers/db');
const Check = require('../controllers/check');
const Utility = require('../controllers/utility');

// Random Quote - Optional Parameter language (en, it) - Default Value en
export default async function handler (req, res) {
	const { language } = req.query;
	const ret = Check.checkParam('language', language, Constants.LANGUAGES, true);

	if ( ret.error ) {
           res.status(401).json(Utility.formatErr(401,'random',ret.error));
	   return;
	} 

	if ( Db.connection() === null ) {
           res.status(401).json(Utility.formatErr(401,'random','Error in DB Connection.'));
	   return;
	}

	const retRandom = await Db.randomQuote(language);

	if ( retRandom.error === null ) {
	   res.status(200).json(retRandom.data[0]);		
	} else {
           res.status(401).json(retRandom.error);
	}
};