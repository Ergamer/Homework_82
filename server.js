const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const artist = require('./app/artists');
const album = require('./app/albums');
const track = require('./app/tracks');
const user = require('./app/users');
const trackHistory = require('./app/trackHistory');
const app = express();

const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(config.db.url + '/' + config.db.name);

const db = mongoose.connection;

db.once('open', () => {
    console.log('Mongoose connected!');

    app.use('/artist', artist());
    app.use('/album', album());
    app.use('/track', track());
    app.use('/users', user());
    app.use('/trackHistory', trackHistory());

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
});
