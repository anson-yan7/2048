const mongoose = require('mongoose')

const { Schema, model } = mongoose

const leaderboardSchema = new Schema({
  id: { type: String, default: '2048' },
  list: { type: Map, of: String },
})

const Leaderboard = model('leaderboard', leaderboardSchema)
module.exports = Leaderboard