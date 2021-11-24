const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/codial_development');
var User=require('../models/user');
const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to Mongo db"));

db.once('open',function(){
        console.log("connected to database :: mongo db");
});

module.exports=db;