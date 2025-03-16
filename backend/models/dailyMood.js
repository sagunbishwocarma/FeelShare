const mongoose = require('mongoose');
const {Schema} = mongoose

const moodEntrySchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  mood: { type: Number, required: true, min: 1, max: 5 },
  notes: { type: String },
});

const DailyMood = mongoose.model('DailyMood', moodEntrySchema);

module.exports = DailyMood; 