const express = require('express');
const User = require('../models/User');
const nanoid = require('nanoid');

const createRouter = () => {
    const router = express.Router();

    router.post('/', (req, res) => {
        const user = new User(req.body);

        user.save()
            .then(user => res.send(user))
            .catch(error => res.status(400).send(error));
    });

    router.post('/sessions', async (req, res) => {
        const user = await User.findOne({username: req.body.username});


        if (!user) return res.status(400).send({error: 'Username not found'});

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) return res.status(400).send({error: 'Password is wrong'});

        user.token = nanoid();

        await user.save();

        return res.send({message: 'Username and password correct!', user});

    });

    return router;
};
module.exports = createRouter;
