
//NOTE: USE ONLY ONCE TO SEED DB

const seedData = require('./seedData');
const Artist = require('../models/artist')
const mongoose = require('mongoose');
const {database} = require('../../config');


mongoose.connect(database);

Artist.collection.insertMany(seedData, (err, result)=> {
    if(err) return console.error(err);
    else console.log(result);
 })


