const mongoose = require('mongoose')
const {Schema} = mongoose

const articleSchema = new Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
    source: {
        type: String,
        required: true,
        match: /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.*)?$/,
      },
    professional: { type: mongoose.Schema.Types.ObjectId, ref: 'Professional', required: true},
    email: {type: String, ref: 'Professional', required: true},
    
  });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article; 