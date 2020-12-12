const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//const uri= process.env.ATLAS_URI;
const uri= 'mongodb://admin:admin@cluster0-shard-00-00.gpfyh.mongodb.net:27017,cluster0-shard-00-01.gpfyh.mongodb.net:27017,cluster0-shard-00-02.gpfyh.mongodb.net:27017/test?ssl=true&replicaSet=atlas-kqxgfv-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Yeaaay ! MongoDB database connection established successfully')
})
.catch(() => console.log(err));

//ROUTES
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log('Here we go ! server is running on port: ${port}')
});