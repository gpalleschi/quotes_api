const Constants = require('../controllers/constants');
const Db = require('../controllers/db');
const Check = require('../controllers/check');
const Utility = require('../controllers/utility');

// Return info about quotes for a specific language
export default async function handler (req, res) {
        const { language } = req.query;
	const ret = Check.checkParam('language', language, Constants.LANGUAGES, true);

	if ( ret.error ) {
           res.status(401).json(Utility.formatErr(401,'info',ret.error));
	   return;
	} 

	if ( Db.connection() === null ) {
           res.status(401).json(Utility.formatErr(401,'info','Error in DB Connection.'));
	   return;
	}

        const retInfo = await Db.infoQuotes(language);
        if ( retInfo.error === null ) {
           res.status(200).json(retInfo.data[0]);		
        } else {
	//    console.log('Error : ' + JSON.stringify(retInfo.error));
           res.status(401).json(retInfo.error);
        }
};