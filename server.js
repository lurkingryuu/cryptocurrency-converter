const express = require('express');
const mongoose = require('mongoose');
const { uri } = require('./utils/db_uri');
const { port, host } = require('./config/config');

// Connect to MongoDB
mongoose.connect(uri()).catch((err) => {
    if (err) {
        console.error(err);
        console.error('Failed to connect to MongoDB');
        process.exit(1);
    }
});
const db = mongoose.connection;


const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/ping', (req, res) => {
    res.send('Pong!');
});

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);

    // Check if MongoDB is connected
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Connected to MongoDB');
    });
});