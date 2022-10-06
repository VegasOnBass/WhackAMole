const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for score
const ScoreSchema = new Schema(
  {
    name: String,
    score: Number,
  },
  {
    timestamps: { createdAt: 'created_at' }
  }
);

// Create model for score
const Score = mongoose.model('score', ScoreSchema);

module.exports = Score;