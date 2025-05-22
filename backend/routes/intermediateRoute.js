const express = require('express');
const router = express.Router();
const intermediateController = require('../controllers/intermediateController');

router.post('/intermediate', intermediateController.handleIntermediateCode);

module.exports = router;
