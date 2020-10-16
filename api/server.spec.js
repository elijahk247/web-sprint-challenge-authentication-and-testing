const supertest = require('supertest');

const server = require('./server.js');
const { intersect } = require('../database/dbConfig.js/');
const { expect } = require('helmet');

describe('server.js', () => {
  describe('get request for jokes', () => {
    it('should return a stuats 400 when not logged in', () => {
      return supertest(server).get('/api/jokes')
        .then(res => {
          expect(res.status).toBe(400);
        })
    });

    it('should return json of joke', () => {
      return supertest(server).get('/api/jokes')
        .then(res => {
          expect(res.type).toBe('application/json');
        })
    });
  });

  describe('registering a new user', () => {
    it('should return status code 201 when adding a new user', () => {

    })
  })
})