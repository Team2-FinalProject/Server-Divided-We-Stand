const router = require('express').Router()
const leaderboardController = require('../controllers/leaderboardController')

router.post('/finish', leaderboardController.addLeaderboard)
router.get('/finish', leaderboardController.getLeaderboard)

module.exports = router