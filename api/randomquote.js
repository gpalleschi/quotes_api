import Constants from '../controllers/constants.js';
import {connection, randomQuote} from '../controllers/db.js';
import {checkParam} from '../controllers/check.js';
import {formatErr} from '../controllers/utility.js';

// Random Quote - Optional Parameter language (en, it, es) - Default Value en
export default async function handler(req, res) {
    const {language} = req.query;
    const ret = checkParam('language', language, Constants.LANGUAGES, true);

    if (ret.error) {
        res
            .status(401)
            .json(formatErr(401, 'random', ret.error));
        return;
    }

    if (connection() === null) {
        res
            .status(401)
            .json(formatErr(401, 'random', 'Error in DB Connection.'));
        return;
    }

    const retRandom = await randomQuote(language);

    if (retRandom.error === null) {
        res
            .status(200)
            .json(retRandom.data[0]);
    } else {
        res
            .status(401)
            .json(retRandom.error);
    }
};