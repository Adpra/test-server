const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const blogRoutes = require('./src/routes/blog');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
    res.setHeader('Access-control-Allow-Origin', '*');
    res.setHeader('Access-control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next();
})


app.use('/v1',blogRoutes );

app.use((error,req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message:message, data : data});
})

mongoose.connect('mongodb+srv://adipra:e1GJ05hs2vkudhPM@cluster0.nubzj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology:true})
.then(() => {
    app.listen(process.env.PORT || 4001, () => console.log('Connect success'));
})
.catch(err => console.log(err));

