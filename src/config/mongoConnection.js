import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
let url = 'mongodb://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME + '?authSource=admin';
mongoose.connect(url, { useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, succ) => {
    if (err) {
        exports.isDbConnected = false;
        console.log("sorry, can not connect with MongoDB..")
    } else {
        exports.isDbConnected = true;
        exports.isDbResponse = succ.db;
        console.log("MongoDB Connected !")
    }
});