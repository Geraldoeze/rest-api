const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');


const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null,  file.originalname);
    } 
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


const MONGODB_URI = 'mongodb://127.0.0.1:27017/node-clus'
// `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@node-cluster.uktzq.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;

const URI = 'mongodb://127.0.0.1:27017/node-clus'

app.use(bodyParser.json()); //application/json

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    //CORS error handler
    res.setHeader('Access-Control-Allow-Origin', '*', 'OPTIONS');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next();
})

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('Server is Running!')
  })

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data });
})
const port = process.env.PORT || 5500

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
})
.then(result => {
  console.log('Connected')
//   Socket io connection
    const server = app.listen(port);
    const io = require("./socket").init(server); 
    io.on('connection', socket => {
      console.log('Client connected', socket.id);
    })
})  
  .catch(err => {
    console.log(err);
  })
