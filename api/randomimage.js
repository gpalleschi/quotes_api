const Constants = require('../controllers/constants');
const Db = require('../controllers/db');
const Check = require('../controllers/check');
const Utility = require('../controllers/utility');

// Random Quote - Optional Parameter language (en, it) - Default Value en
export default async function handler (req, res) {
	console.log('Start')
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

	// Reading image
        // Defining the text font

	if ( retRandom.error === null ) {
        //    const imgToSnd = await textOverlay(retRandom.data[0]);	
	//    const imageBuffer = fs.readFileSync('./image/toSend.jpg')
	//    res.setHeader('Content-Type', 'image/jpg')
        //    res.send(imgToSnd)
	res.status(200).send('<div style="font-size:32px; font-weight: bold;">' +
	                     '<img src="../images/2.jpg" alt="1" style="width:100%">' +
			     '<p style="position: absolute;  top: 30%; left: 50%; transform: translate(-50%, -50%);">\"' + retRandom.data[0].quote + '\"<br><br>'+ retRandom.data[0].author + '</p>' +
	                     '</div>');
	} else {
           res.status(401).json(retRandom.error);
	}
};