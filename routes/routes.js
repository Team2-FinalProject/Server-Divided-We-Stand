const router = require('express').Router()
const leaderboardController = require('../controllers/LeaderboardController')

router.post('/', leaderboardController.addLeaderboard)
router.get('/', leaderboardController.getLeaderboard)

module.exports = router