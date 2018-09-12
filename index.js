const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const router = require('./config/router');

app.use(express.static(`${__dirname}/public`));

app.use('/api', router);

app.listen(port, () => console.log(`Express running on port ${port}`));
module.exports = app;
