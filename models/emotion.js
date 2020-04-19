const { model, Schema } = require('mongoose');

const emotionSchema = new Schema({
    _id : { type : Number, required : true },
    name: String
});

module.exports = model('Emotion', emotionSchema);