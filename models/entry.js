const { model, Schema } = require('mongoose');
const { timestamp } = require('./plugins');

const entrySchema = new Schema({
    mood: { type: Number, ref: 'Mood' },
    emotions: [{ type: Number, ref: 'Emotion' }],
    comments: String,
    createdDate: Date,
    updatedDate: Date,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

entrySchema.plugin(timestamp);

module.exports = model('Entry', entrySchema);