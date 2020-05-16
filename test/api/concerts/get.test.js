const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  
  before(async () => {
    const testConcertOne = new Concert({
      _id: '5eb98b1b6d43a605c294e4b1',
      performer: 'John Doe',
      genre: 'Rock',
      price: 25,
      day: 1,
      image: '/img/uploads/1fsd324fsdg.jpg'
    });
    await testConcertOne.save();

    const testConcertTwo = new Concert({
      _id: '5eb98b1b6d43a605c294e4b2',
      performer: 'Rebekah Parker',
      genre: 'R&B',
      price: 25,
      day: 1,
      image: '/img/uploads/2f342s4fsdg.jpg'
    });
    await testConcertTwo.save();
  });



  it('/ should return all concerts', async () => {
    try {
      const res = await request(server).get('/api/concerts');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(2);
    } catch (err) {
      console.log(err);
    }
  }); 

  it('/:id should return concert by id', async () => {
    try {
      const res = await request(server).get(
        '/api/concerts/5eb98b1b6d43a605c294e4b1'
      );
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.not.be.null;
    } catch (err) {
      console.log(err);
    }
  });

  it('/performer/:performer', async () => {
    try {
      const res = await request(server).get('/api/concerts/performer/John Doe');
      const res2 = await request(server).get('/api/concerts/performer/Lady Gaga');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.not.be.null;
      expect(res.body.length).to.be.equal(1);
      expect(res2.status).to.be.equal(404);
    } catch (err) {
      console.log(err);
    }
  });

  it('/genre/:genre', async () => {
    try {
      const res = await request(server).get('/api/concerts/genre/Rock');
      const res2 = await request(server).get('/api/concerts/genre/jazz');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(1);
      expect(res.body).to.not.be.null;
      expect(res2.status).to.be.equal(404);
    } catch (err) {
      console.log(err);
    }
  });

  it('/concerts/price/:price_min/:price_max', async () => {
    try {
      const res = await request(server).get('/api/concerts/price/20/30');
      const res2 = await request(server).get('/api/concerts/price/10/20');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(2);
      expect(res.body).to.not.be.null;
      expect(res2.status).to.be.equal(404);
    } catch (err) {
      console.log(err);
    }
  });

  it('/concerts/day/:day', async () => {
    try {
      const res = await request(server).get('/api/concerts/day/1');
      const res2 = await request(server).get('/api/concerts/day/2');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(2);
      expect(res.body).to.not.be.null;
      expect(res2.status).to.be.equal(404);
    } catch (err) {
      console.log(err);
    }
  });
 
  after(async () => {
    await Concert.deleteMany();
  });
 
});