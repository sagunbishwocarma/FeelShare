const mongoose = require('mongoose')
const {Schema} = mongoose

const journalSchema = new Schema({
    title: String,
    content: String,
    date: { type: Date, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  });

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal; 