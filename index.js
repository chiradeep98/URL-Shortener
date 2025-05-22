const express = require('express');
const connectMongoDb = require('./config/connection');
require('ejs');
const path = require('path');
const {router} = require('./routes/route');
const {staticRouter} = require('./routes/static_routes');
const app = express();
const PORT = 8000;


connectMongoDb('mongodb://127.0.0.1:27017/url')
.then(()=> {console.log('MongoDb Connected')})
.catch((error) => {console.log(`Some error occured: ${error}`)});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.use('/url', router);
app.use('/', staticRouter);






app.listen(PORT, () => {console.log('Server Created at: ', PORT)});