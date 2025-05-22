const express = require('express');
const router = express.Router();

const { performSyntaxAnalysis } = require('../controllers/syntaxController');

router.post('/syntax', performSyntaxAnalysis); 

module.exports = router;
