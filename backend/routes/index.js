const express = require('express');
const router = express.Router();

const compileRoute = require('./compileRoute');
const lexicalRoute = require('./lexicalRoute');
const syntaxRoute = require('./syntaxRoutes');
const intermediateRoute = require('./intermediateRoute');
const semanticRoute = require('./semanticRoute');
const targetRoute = require('./targetRoute'); // ✅ Add this line

router.use(compileRoute);
router.use(lexicalRoute);
router.use(syntaxRoute);
router.use(intermediateRoute);
router.use(semanticRoute);
router.use(targetRoute); // ✅ Register the route

router.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

module.exports = router;
