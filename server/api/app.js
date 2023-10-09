const express = require('express');
require('dotenv').config();
const HostService = require('../services/hostService');
const hostService = new HostService()
const logger = require('../middlewares/logger');
const errorMW = require('../middlewares/errors');

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
    res.send(await hostService.getAll())
})

app.get(`/:id`, async (req, res) => {
    res.send(await hostService.getById(req.params.id))
})


app.put(`/:id`, async (req, res, next) => {
        let result = await hostService.update(req.params.id, req.body.data);
        if (result.error) {
            next(result.error)
        }
        else {
            res.send(result);
        }
});

app.delete(`/:id`, async (req, res) =>{
    res.send(await hostService.delete(req.params.id));
});

app.use(logger());

app.post('/', async (req, res, next) => {
    let result = await hostService.insert(req.body);
    if (result.error) {
        next(result.error)
    }
    else {
        res.send(result);
    }
});

app.use(errorMW);

app.listen(3000, () => {
    console.log('server is up and running')
});
