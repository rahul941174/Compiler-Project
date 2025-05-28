// routes/targetRoute.js
const express = require('express');
const router = express.Router();

// Mock Target Code Generator
function generateTargetCode(intermediateCode) {
  return intermediateCode.map((line, index) => `MOV R${index}, ${line}`);
}

// POST route for Target Code Generation
router.post('/target', (req, res) => {
  const { intermediateCode } = req.body;

  if (!intermediateCode || !Array.isArray(intermediateCode)) {
    return res.status(400).json({ error: 'Intermediate code must be an array.' });
  }

  const targetCode = generateTargetCode(intermediateCode);
  res.json({ targetCode });
});

module.exports = router;
