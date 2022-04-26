const Constants = require('../controllers/constants');

// Return all languages managed
export default function handler (req, res) {
	res.send({'languages' : Constants.LANGUAGES});
};
