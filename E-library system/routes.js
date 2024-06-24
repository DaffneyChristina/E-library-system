const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.get('/search', async (req, res) => {
  const { query } = req.query;
  const books = await Book.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { author: { [Op.like]: `%${query}%` } },
      ],
    },
  });
  res.json(books);
});

router.post('/borrow', async (req, res) => {
    const { bookId } = req.body;
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json({ message: 'Book borrowed successfully' });
  });
  
  module.exports = router;