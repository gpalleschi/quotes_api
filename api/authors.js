import Constants from './constants.js';
import {connection}        from './db.js';
import { checkParam, getAuthors } from './check.js';
import Utility   from './utility.js';

export default async function handler (req, res) {
	const { language, search } = req.query;
	const ret = checkParam('language', language, Constants.LANGUAGES, true);

	if ( ret.error ) {
           res.status(401).json(Utility.formatErr(401,'authors',ret.error));
	   return;
	} 

	if ( connection() === null ) {
           res.status(401).json(Utility.formatErr(401,'authors','Error in DB Connection.'));
	   return;
	}

	const retAuthors = await getAuthors(language, search);

	if ( retAuthors.error === null ) {
	   res.status(200).json(retAuthors.data);		
	} else {
           res.status(401).json(retAuthors.error);
	}
};