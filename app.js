var mongoose = require('mongoose');
var express =require('express');
var app= express();
var bodyParser = require('body-parser');
var seedData = require('./seed');

const port = 3030; //getting port number from .env file

//connect db to localclient starts
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/userDB', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

var db = mongoose.connection;
//console.log(db//)
if (db.isConnected) {
    console.log("DB CONNECTED");
} else {
    console.log("DB NOT CONNECTED");
}


seedData.seedCounterUsers();
//seedData.seedUsers();

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}))

app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));

//controllers
var userController = require('./controllers/userController');

app.use('/api', userController);

app.listen(port, () => {
    console.log('App listening on port ', port);
})




