const express = require('express');
const Joi = require('joi');
const app = express();
const genres = require('./routes/genres');
const home = require('./routes/home');
app.use(express.json());
app.use('/api/genres',genres);
app.use('/',home);
app.listen(5000, () => {
    console.log("app is listening to the port 5000....");
});
