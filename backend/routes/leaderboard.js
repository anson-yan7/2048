const express = require('express')
const Leaderboard = require('../models/leaderboard')
const router = express.Router()

router.post('/add', async (req, res, next) => {
    const { body } = req
    const { username, score } = body
    try {  
        const leaderboard = await Leaderboard.findOne({'id': '2048'})
        const currentScore = leaderboard.list.get(username)
        if (score > currentScore) {
            leaderboard.list.set(username, score)
        }
    } catch (e) {
        next(e)
    }
})
router.get('/', async(req, res, next) => {
    try {  
        const leaderboard = await Leaderboard.findOne({'id': '2048'})
        res.json(leaderboard)
    } catch (e) {
        next(e)
    }
})

module.exports = router