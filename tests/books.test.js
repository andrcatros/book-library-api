/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
  before(async () => Book.sequelize.sync());

  describe('with no records in the database', () => {
    describe('POST /books', () => {
      it('creates a new book in the database', async () => {
        const response = await request(app).post('/books').send({
          title: 'Pride and Prejudice',
          author: 'Jane Austen',
          genre: 'romantic comedy',
          ISBN: '1522766987'
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal('Pride and Prejudice');
        expect(newBookRecord.title).to.equal('Pride and Prejudice');
        expect(newBookRecord.author).to.equal('Jane Austen');
        expect(newBookRecord.genre).to.equal('romantic comedy');
        expect(newBookRecord.ISBN).to.equal('1522766987'); 
      });
    });
  });

  describe('with records in the database', () => {
    let books;

    beforeEach(async () => {
      await Book.destroy({ where: {} });

      books = await Promise.all([
        Book.create({title:'Pride and Prejudice', author:'Jane Austen', genre:'romantic comedy', ISBN:'1522766987'}),
        Book.create({title:'Emma', author:'Jane Austen', genre:'romantic comedy', ISBN:'0141439580'}),
        Book.create({title: 'Wuthering Heights', author:'Emily Bronte', genre:'gothic', ISBN:'0141439556'})
      ]);
    });

    describe('GET /books', () => {
      it('gets all book records', async () => {
        const response = await request(app).get('/books');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((book) => {
          const expected = books.find((a) => a.id === book.id);

          expect(book.title).to.equal(expected.title);
          expect(book.author).to.equal(expected.author);
        });
      });
    });
});

});