import express from 'express';
import bodyParser from 'body-parser';
import routes from './route/index';
import mongoConnection from './config/mongoConnection';
import dotenv from 'dotenv';

dotenv.config();
let app = express();

app.use(bodyParser.json({
  limit: '20mb',
  extended: true
}));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(routes);

let port = process.env.PORT || 1858;
let server = app.listen(port, () => console.log('server started on port ' + `${port}`));
exports.mainserver = server;