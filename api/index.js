import express, { json } from 'express';
import cors from 'cors';
import { DEFAULT_PORT } from '../controllers/constants.js';
import { name, version } from '../package.json';

// App definition
const app = express();

// To read body correctly 
app.use(json());

// Access Permission between client and server
app.use(cors());

const port=process.env.PORT || DEFAULT_PORT;

app.get('/api',(req,res)=>{
	res.send('Server ' + name + ' version ' + version + ' is running on port ' + port);
});

console.log('Starting Server ...... ');

app.listen(port, () => {
	console.log('Server ' + name + ' version ' + version + ' is running on port ' + port)
});