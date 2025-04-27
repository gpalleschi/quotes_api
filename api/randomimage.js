import Constants from '../controllers/constants.js';
import {connection, randomQuote} from '../controllers/db.js';
import {checkParam} from '../controllers/check.js';
import {formatErr} from '../controllers/utility.js';

// Random Quote - Optional Parameter language (en, it) - Default Value en
export default async function handler(req, res) {
    console.log('Start')
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

    // Reading image Defining the text font
    if (retRandom.error === null) {

        const randomIdxTP = Math.floor(Math.random() * Constants.TYPE_PHOTOS.length);

        const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${Constants.TYPE_PHOTOS[randomIdxTP]}&image_type=photo&image_type=photo`;
        try {
            const res2 = await fetch(url);
            if (!res2.ok) {
                // Errore HTTP
                throw new Error(`HTTP error! status: ${res2.status}`);
            }

            const data = await res2.json();
            if (!data.hits || data.hits.length === 0) {
                // Nessun risultato
                throw new Error('Nessuna immagine trovata per la query specificata.');
            }

            const randomIndex = Math.floor(Math.random() * data.hits.length);
            const webformatURL = data
                .hits[randomIndex]
                .webformatURL;
            res
                .status(200)
                .send({
                    "url": webformatURL,
                    "author": retRandom
                        .data[0]
                        .author,
                    "quote": retRandom
                        .data[0]
                        .quote
                });
        } catch (err) {
            // Gestione errore (network, parsing, no hits, ecc.)
            console.error('Errore durante il fetch:', err.message);
            res
                .status(401)
                .json(retRandom.error);
            // Rilancio o ritorno null a seconda della tua logica
            throw err;
        }
    } else {
        res
            .status(401)
            .json(retRandom.error);
    }
};
