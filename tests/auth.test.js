const request = require('supertest');
const app = require('../index');

describe('Auth', () => {
  it('registers user safely', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'test',
        password: '123456'
      });

    expect(res.statusCode).toBe(201);
  });
});
