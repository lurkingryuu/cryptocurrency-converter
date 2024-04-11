const express = require('express');
const mongoose = require('mongoose');
const cronjob = require('node-cron');
const { uri } = require('./utils/db_uri');
const { port, host, cron } = require('./config/config');
const { updateCoins } = require('./src/services/crypto_update.service');


mongoose.connect(uri()).catch((err) => {
    if (err) {
        console.error(err);
        console.error('Failed to connect to MongoDB');
        process.exit(1);
    }
});
const db = mongoose.connection;


const app = express();

app.get('/ping', (req, res) => {
    res.status(200);
    res.send('Pong!');
});


if (cron.enabled) {
    updateCoins(); // trigger once at the start
    cronjob.schedule(cron.pattern, async () => {
        await updateCoins();
    });
}

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Connected to MongoDB');
    });
});