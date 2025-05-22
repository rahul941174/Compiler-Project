const express = require('express');
const router = express.Router();

const compileRoute = require('./compileRoute');
const lexicalRoute = require('./lexicalRoute');
const syntaxRoute = require('./syntaxRoutes'); 
const intermediateRoute = require('./intermediateRoute');

router.use(compileRoute);
router.use(lexicalRoute);
router.use(syntaxRoute); 
router.use(intermediateRoute);

router.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

module.exports = router;
