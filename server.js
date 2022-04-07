const express = require('express');
const cors = require('cors');
const Constants = require('./controllers/constants');
const Check = require('./controllers/check');
const Utility = require('./controllers/utility');
const Db = require('./controllers/db');
const pjson = require('./package.json');

// App definition
const app = express();

const callRandom = async (language) => {
    const ret = await Db.randomQuote(language);
    return ret;
} 


// To read body correctly 
app.use(express.json());

// Access Permission between client and server
app.use(cors());

const port=process.env.PORT || Constants.DEFAULT_PORT;

app.get('/',(req,res)=>{
	res.send('Server ' + pjson.name + ' version ' + pjson.version + ' is running on port ' + port);
});

// Random Quote - Optional Parameter language (en, it) - Default Value en
app.get('/randomquote',async (req,res)=>{
	const { language } = req.query;
	const ret = Check.checkParam('language', language, Constants.LANGUAGES, false);

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
});

// Return all languages managed
app.get('/languages',(req,res)=>{
	res.send({'languages' : Constants.LANGUAGES});
});


// Return info about quotes for a specific language
app.get('/info',async (req,res)=>{
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
});

console.log('Starting Server ...... ');

app.listen(port, () => {
	console.log('Server ' + pjson.name + ' version ' + pjson.version + ' is running on port ' + port)
});