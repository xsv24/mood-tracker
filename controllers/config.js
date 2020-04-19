const Emotion = require('../models/emotion'); 
const Mood = require('../models/mood'); 

exports.config = function(req, res, next) {
    Promise.all([
        Emotion.find(),
        Mood.find()
    ]).then(collections => {
        return res.status(201).json({
            emotions: collections[0],
            moods: collections[1]
        })
    }).catch(err => next(err));
};