const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const multer = require('multer');
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mainRoutes = require('./routes/main');
const authRouter = require('./routes/auth.js');
const ejsMate = require('ejs-mate')
const authMiddleware = require('./middlewares/authMiddleware.js');
const refreshTokenMiddleware = require('./middlewares/refreshTokenMiddleware.js');
const cookieParser = require('cookie-parser');

const app = express();
const upload = multer();
const PORT = process.env.PORT || 5000;
const mongoURI = "mongodb+srv://bekatop1gg:GGgsF9ZGc4R59Rfs@cars.dg4sc3h.mongodb.net/Janym"

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');

app.use('/styles', express.static(path.join(__dirname, '/styles')));
app.use('/images', express.static(path.join(__dirname, '/images')));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(upload.array());
app.use(bodyParser.urlencoded({ extended: true }));

// DON'T CHANGE THE ORDER OF THESE MIDDLEWARES
app.use(refreshTokenMiddleware);
app.use(authMiddleware);

app.use(mainRoutes);
app.use('/auth', authRouter);

async function start() {
    try {
        await mongoose.connect(mongoURI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        app.listen(PORT, () => {
            console.log('Server has been started... ' + PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start().then(r => console.log(r))