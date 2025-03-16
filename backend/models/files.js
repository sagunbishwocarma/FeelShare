const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  uploadDate: { type: Date, default: Date.now },
  professionalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Professional', required: true },
  email: {type: String, ref: 'Professional', required: true},
});

module.exports = mongoose.model('File', fileSchema);