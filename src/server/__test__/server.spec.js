// to solve ReferenceError: regeneratorRuntime is not defined
// https://knowledge.udacity.com/questions/174638
import 'babel-polyfill'

/* describe('Server Test', () => {
    //add your test cases to test server
    // HINT: Review
    //  1. https://www.npmjs.com/package/supertest
    //  2. https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6
}) */
const request = require('supertest')
import app from '../../server/index.js'

describe('Server Test', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/getURLInfo')
      .send({
          url: 'https://getbootstrap.com/docs/4.1/components/modal/'
      })
    expect(res.statusCode).toEqual(200)
  });
})
