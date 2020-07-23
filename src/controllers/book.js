const { Book } = require('../models');

const getBooks = (_, res) => {
  Book.findAll().then(readers => {
    res.status(200).json(readers);
  });
};

const createBook = (req, res) => {
  Book.create(req.body).then(book => {
    res.status(201).json(book);
  })
}

module.exports = {
    getBooks, createBook
}