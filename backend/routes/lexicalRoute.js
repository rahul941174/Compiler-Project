const express = require('express');
const router = express.Router();
const { tokenize } = require('../controllers/lexicalController');

router.post('/lexical', (req, res) => {
  const { code } = req.body;
  const tokens = tokenize(code);
  res.json({ tokens });
});

module.exports = router;
