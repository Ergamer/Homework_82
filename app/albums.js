const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const Album = require('../models/Album');

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

const router = express.Router();

const createRouter = (db) => {
    // Album index
    router.get('/', (req, res) => {
        Album.find().populate('singer')
            .then(results => res.send(results))
            .catch(() => res.sendStatus(500));
    });

    // Album create
    router.post('/', upload.single('coverImage'), (req, res) => {
        const albumData = req.body;

        if (req.file) {
            albumData.coverImage = req.file.filename;
        } else {
            albumData.coverImage = null;
        }

        const album = new Album(albumData);

        album.save()
            .then(result => res.send(result))
            .catch(error => res.status(400).send(error));
    });

    // Album get by ID
    router.get('/:id', (req, res) => {
        const id = req.params.id;
            Album.findOne({_id: req.params.id}, function (err, result) {
                if (err) res.status(404).send(err);
                if (result) res.send(result)
            });

    });

    return router;
};

module.exports = createRouter;