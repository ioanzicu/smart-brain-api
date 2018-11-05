const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: '3cda67ae0adb4ae6b169d3b5a3a7bb7a'});

const handleApiCall = (req, res) => {
	console.log('req', req);
	console.log('res', res);
	if(!req.body.input) {
		return res.status(400);
	}
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('Unable to work with API'));
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = { 
	handleImage,
	handleApiCall  }