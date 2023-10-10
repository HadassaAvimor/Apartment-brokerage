const express = require('express');
const cors = require('cors');
require('dotenv').config();
const HostService = require('../services/hostService');
const hostService = new HostService()
const logger = require('../middlewares/logger');
const errorMW = require('../middlewares/errors');
const host = require("./host");
const auth = require("./auth");
const app = express();
// Allow requests from localhost:3000
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent with the request (if applicable)
  }));

app.use(express.json());
// app.use(express.urlencoded()) 
app.use('/auth', auth);
app.use('/hosts', host);

app.listen(3000, () => {
    console.log('server is up and running')
});
