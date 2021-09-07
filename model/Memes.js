const db = require('mongoose');

const memeSchema = new db.Schema(
  {
    url: {
      type: String,
      required: [true, 'A meme must have an URL'],
    },
    created: {
      type: Date,
      default: Date.now(),
    },
    active: {
      type: Boolean,
      default: true,
    },
    uploaded: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

Memes = db.model('Meme', memeSchema);

module.exports = Memes;
