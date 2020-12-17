const request = require('supertest')
const app = require('../app')

describe('Leaderboard', () => {
  it("Get leaderboard", (done) => {
    const obj = {
      juara: ['nesta', 'semaun', 'kiwil'],
      kalah: ['nista', 'samaun', 'wilki'],
      RoomId: "ijn39n3njndnvui398nnfdgjidgfn"
    }
    request(app)
      .post('/finish')
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