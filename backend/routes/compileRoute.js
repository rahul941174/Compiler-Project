const express = require('express');
const router = express.Router();

router.post('/compile', (req, res) => {
  const { code } = req.body;
  res.json({ message: `Received code: ${code}` });
});

module.exports = router;
