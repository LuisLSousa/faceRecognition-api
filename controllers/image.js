const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.API_CLARIFAI
});

const handleApiCall = (req, res) => {
    
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
        // Clarifai.FACE_DETECT_MODEL
        // 'c0c0ac362b03416da06ab3fa36fb58e3'
      req.body.input)
      .then(data => res.json(data))
      .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users')
    .where('id', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))   
    .catch(err => res.status(400).json('Unable to retrieve entries')) 
}

module.exports = {
    handleImage,
    handleApiCall
}