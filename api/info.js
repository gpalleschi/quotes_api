import Constants from '../controllers/constants.js';
import { connection, infoQuotes }         from '../controllers/db.js';
import { checkParam }     from '../controllers/check.js';
import { formatErr }   from '../controllers/utility.js';

// Return info about quotes for a specific language
export default async function handler (req, res) {
        const { language } = req.query;
	const ret = checkParam('language', language, Constants.LANGUAGES, true);

	if ( ret.error ) {
           res.status(401).json(formatErr(401,'info',ret.error));
	   return;
	} 

	if ( connection() === null ) {
           res.status(401).json(formatErr(401,'info','Error in DB Connection.'));
	   return;
	}

        const retInfo = await infoQuotes(language);
        if ( retInfo.error === null ) {
           res.status(200).json(retInfo.data[0]);		
        } else {
	//    console.log('Error : ' + JSON.stringify(retInfo.error));
           res.status(401).json(retInfo.error);
        }
};