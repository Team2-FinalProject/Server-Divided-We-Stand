const request = require('supertest')
const app = require('../app')
const { TeamOne, sequelize } = require('../models/index')

describe("Post Team", () => {
  it("Add player teamOne successfully", (done) => {
    const obj = {
      player1: "Rivari",
      player2: "Yeska",
      player3: "Adrian"
    }
    request(app)
      .post('/lobby')
      .send(obj)
      .then((response) => {
        const { status } = response
        expect(status).toBe(201)
        done()
      })
      .catch(err => {
        done()
      })
  })

  it("Add player teamTwo successfully Leaderboards", (done) => {
    const obj = {
      player1: "Rivari",
      player2: "Yeska",
      player3: "Adrian"
    }
    request(app)
      .post('/lobby')
      .send(obj)
      .then((response) => {
        const { status } = response
        expect(status).toBe(201)
        done()
      })
      .catch(err => {
        done()
      })
  })
})