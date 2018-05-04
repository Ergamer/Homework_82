const express = require('express');
const TrackHistory = require('../models/TrackHistory');
const User = require('../models/User');

const createRouter = () => {
    const router = express.Router();

    router.post('/', async (req, res) => {
        const token = req.get('Token');
        const user = await User.findOne({token});


        if(!user) {
            res.status(401).send({error: 'Wrong'})
        } else {
            const track = {user: user._id, track: req.body.track, datetime: new Date()};
            const trackHistory = new TrackHistory(track);
            trackHistory.save()
                .then(trackHistory => res.send(trackHistory))
                .catch(error => res.status(400).send(error));
        }
    });

    return router;
};

module.exports = createRouter;