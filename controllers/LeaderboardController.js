const { Leaderboard } = require('../models/index')

class LeaderboardController {
  static addLeaderboard(req, res) {
    let obj = {
      player_1: req.body.player_1,
      player_2: req.body.player_2,
      score_player1: req.body.score_player1,
      score_player2: req.body.score_player2,
      room: req.body.room
    }
    Leaderboard.create(obj)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static getLeaderboard(req, res) {
    Leaderboard.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log(err)
    })
  }
}

module.exports = LeaderboardController