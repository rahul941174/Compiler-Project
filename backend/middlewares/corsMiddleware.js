const cors = require('cors');

const corsMiddleware = cors(); // default: allows all origins

module.exports = corsMiddleware;
