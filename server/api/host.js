const express = require('express');
const router = express.Router();
const HostService = require('../services/hostService');
const hostService = new HostService()
const logger = require('../middlewares/logger');
const errorMW = require('../middlewares/errors');
var bcrypt = require('bcryptjs');

const auth = require("../middlewares/auth");

router.get('/', async (req, res) => {
    res.send(await hostService.getAll())
})

router.get(`/:id`, async (req, res) => {
    res.send(await hostService.getById(req.params.id))
})

router.use(auth);


router.put(`/`, async (req, res, next) => {
    encryptedPassword = await bcrypt.hash(req.body.password, 10);
    user = req.body;
    user.password = encryptedPassword;
    const existingUser = await hostService.getByEmailAndPassword(user.email);
    if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
    }
    extractedId = existingUser[0]._id

    let result = await hostService.update(extractedId.toString(), user);
    if (result.error) {
        next(result.error);
    }
    else {
        res.send(result);
    }

});

router.delete(`/:id`, async (req, res, next) => {
    let result = await hostService.delete(req.params.id);
    if (result.error) {
        next(result.error);
    }
    else {
        res.send(result.message);
    }
});

router.use(errorMW);
// router.use(logger);

module.exports = router;