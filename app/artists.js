const Artist = require('../models/Artist');
const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');

const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});


const createRouter = () => {
    const router = express.Router();

    router.get('/', (req, res) => {
        Artist.find()
            .then(artists => res.send(artists))
            .catch(() => res.sendStatus(500));
    });

    router.post('/', upload.single('image'), (req, res) => {
        const artistData = req.body;

        if (req.file) {
            artistData.image = req.file.filename;
        } else {
            artistData.image = null;
        }

        const artist = new Artist(req.body);


        artist.save()
            .then(artist => res.send(artist))
            .catch(error => res.status(400).send(error));
    });

    return router;
};

module.exports = createRouter;
