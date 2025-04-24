import Constants from '../controllers/constants.js';
import {connection, randomQuote} from '../controllers/db.js';
import {checkParam} from '../controllers/check.js';
import {formatErr} from '../controllers/utility.js';
import * as data from '../images/images.js';

// Random Quote - Optional Parameter language (en, it) - Default Value en
export default async function handler(req, res) {
    console.log('Start')
    const {language, newmode} = req.query;
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
        // const imgToSnd = await textOverlay(retRandom.data[0]);    const imageBuffer =
        // fs.readFileSync('./image/toSend.jpg')    res.setHeader('Content-Type',
        // 'image/jpg')    res.send(imgToSnd)
        if (typeof newmode === 'undefined' || newmode === 'no') {
            const image = data.images[Math.floor(Math.random() * data.images.length)];
            //    const image = data.images[19];
            res
                .status(200)
                .send(
                    '<div style="font-size:' + image['font-size'] + '; font-weight: bold; font-styl' +
                    'e:italic;"><img src="../images/' + image['name'] + '" alt="1" style="width:100' +
                    '%; opacity:' + image['opacity'] + '"><p style="position: absolute;  top: ' +
                    image.top + '; left: ' + image.left + '; transform: translate(' + image.traslatex +
                    ', ' + image.traslatey + ');">\"' + retRandom.data[0].quote + '\"<br><br>' +
                    retRandom.data[0].author + '</p></div>'
                );
        } else {

            const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=blue+sea&image_type=photo&image_type=photo`;
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

                // Prendo la largeImageURL del primo risultato
                const webformatURL = data
                    .hits[0]
                    .webformatURL;
                res
                    .status(200)
                    .send(
`
<div style="
    position: relative;
    width: 100%;
    max-width: 800px;
    aspect-ratio: 16/9;
    background-image: url('${webformatURL}');
    background-size: cover;
    background-position: center;
    overflow: hidden;
">
  <div style="
      content: '';
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background-color: rgba(0,0,0,0.4);
      z-index: 1;
  "></div>
  <p style="
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      margin: 0;
      padding: 0 20px;
      color: #fff;
      font-size: 40px;
      font-weight: bold;
      font-style: italic;
      text-align: center;
      line-height: 1.3;
      z-index: 2;
  ">
    “${retRandom.data[0].quote}”<br><br>${retRandom.data[0].author}
  </p>
</div>`
                        // '<div style="font-size:40px; font-weight: bold; font-style:italic;"><img src="' +
                        // webformatURL + '" alt="1" style="width:100%; opacity:0.4"><p style="position: ' +
                        // 'absolute;  top: 30%; left: 50%; transform: translate(-50%, -50%);">\"' +
                        // retRandom.data[0].quote + '\"<br><br>' + retRandom.data[0].author +
                        // '</p></div>'
                    );

            } catch (err) {
                // Gestione errore (network, parsing, no hits, ecc.)
                console.error('Errore durante il fetch:', err.message);
                res
                    .status(401)
                    .json(retRandom.error);
                // Rilancio o ritorno null a seconda della tua logica
                throw err;
            }
        }

    } else {
        res
            .status(401)
            .json(retRandom.error);
    }
};
