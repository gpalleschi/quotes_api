import Constants from '../controllers/constants.js';

// Return all languages managed
export default function handler (req, res) {
	res.send({'languages' : Constants.LANGUAGES});
};
