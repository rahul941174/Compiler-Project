// routes/semanticRoute.js
const express = require('express');
const router = express.Router();
const semanticController = require('../controllers/semanticController');

router.post('/semantic', semanticController.handleSemanticAnalysis);

module.exports = router;
