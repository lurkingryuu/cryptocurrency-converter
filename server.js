const express = require('express');
const mongoose = require('mongoose');
const cronjob = require('node-cron');
const bodyParser = require('body-parser');
const { uri } = require('./utils/db_uri');
const { port, host, cron, api } = require('./config/config');
const { updateCoins } = require('./src/services/crypto_update.service');
const { errorHandler, errorConvert } = require('./src/middleware/error');
const convert = require('./src/routes/convert.route');


mongoose.connect(uri()).catch((err) => {
    if (err) {
        console.error(err);
        console.error('Failed to connect to MongoDB');
        process.exit(1);
    }
});
const db = mongoose.connection;


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/ping', (req, res) => {
    res.status(200);
    res.send('Pong!');
});

app.use(api.prefix, convert);


// post middleware
app.use(
    errorConvert,
    errorHandler
);

if (cron.enabled) {
    // updateCoins(); // trigger once at the start
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