const express = require('express');
require('dotenv').config();
const HostService = require('../services/hostService');
const hostService = new HostService()
const logger = require('../middlewares/logger');
const errorMW = require('../middlewares/errors');
const host = require("./host");
const auth = require("./auth");
const app = express();

app.use(express.json());
// app.use(express.urlencoded()) 
app.use('/auth', auth);
app.use('/hosts', host);

app.listen(3000, () => {
    console.log('server is up and running')
});
