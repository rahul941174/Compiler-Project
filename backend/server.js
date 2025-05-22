const express = require('express');
const bodyParser = require('body-parser');
const corsMiddleware = require('./middlewares/corsMiddleware');
const routes = require('./routes');

const app = express();
const port = 5000;

// Middlewares
app.use(bodyParser.json());
app.use(corsMiddleware);

// Routes
app.use('/', routes);

// Start server
app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
