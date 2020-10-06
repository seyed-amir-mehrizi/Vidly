const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const app = express();
const genres = require('./routes/genres');
const home = require('./routes/home');
const customers = require('./routes/customers');
mongoose.connect("mongodb://localhost/Vidly",{useUnifiedTopology:true,
useUnifiedTopology:true , useNewUrlParser: true})
.then(()=>{
    console.log("the project connect to the database....");
})
.catch(()=>{
    console.log("connection is failed....");
})
mongoose.set('useFindAndModify', false);
app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/',home);
app.listen(5000, () => {
    console.log("app is listening to the port 5000....");
});
