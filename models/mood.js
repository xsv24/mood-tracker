const { model, Schema } = require('mongoose');

const moodSchema = new Schema({
    _id : { type : Number, required : true },
    name: String,
    color: String
});

module.exports = model('Mood', moodSchema);