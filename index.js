const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const multer = require('multer');
const express = require('express');
const path = require('path');
const ejs = require('ejs');

const app = express();
var upload = multer();
const PORT = process.env.PORT || 5000;
const mongoURI = "mongodb+srv://bekatop1gg:GGgsF9ZGc4R59Rfs@cars.dg4sc3h.mongodb.net/Janym"

app.set('view engine', 'ejs');

app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

async function start() {
    try {
        await mongoose.connect(mongoURI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        app.listen(PORT, () => {
            console.log('Server has been started...')
        })
    } catch (e) {
        console.log(e)
    }
}

start()