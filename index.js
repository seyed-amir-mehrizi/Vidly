const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const app = express();
const cors = require('cors');
const genres = require('./routes/genres');
const home = require('./routes/home');
const customers = require('./routes/customers');
const users = require('./routes/user');
const auth = require('./routes/auth');
mongoose.connect("mongodb://localhost/Vidly",{useUnifiedTopology:true,
useUnifiedTopology:true , useNewUrlParser: true})
.then(()=>{
    console.log("the project connect to the database....");
})
.catch(()=>{
    console.log("connection is failed....");
})
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.use(express.json());
app.use(cors())
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/',home);


//Port
const port = process.env.PORT || 5000  ;
app.listen(port, () => {
    console.log(`app is listening to the port ${port}....`);
});
