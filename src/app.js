import express from 'express';
import bodyParser from 'body-parser';
import routes from './route/index';
import mongoConnection from './config/mongoConnection';
import dotenv from 'dotenv';
var https = require('https')
var swagger = require("swagger-node-express");
// import swagger from 'swagger-node-express';
var argv = require('minimist')(process.argv.slice(2));


dotenv.config();
let app = express();


const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });

// Swagger configuration start
var subpath = express();
app.use(bodyParser.json({ limit: '100mb' }));
app.use("/", subpath);
swagger.setAppHandler(subpath);
app.use(express.static('swaggerdoc'));

swagger.setApiInfo({
  title: "example API",
  description: "API to do something, manage something...",
  termsOfServiceUrl: "",
  contact: "yourname@something.com",
  license: "",
  licenseUrl: ""
});

subpath.get('/event', function (req, res) {
  res.sendfile(__dirname + '/swaggerdoc/v1/index.html');
});

swagger.configureSwaggerPaths('', 'api-docs', '');

var domain = 'localhost';
if (argv.domain !== undefined)
  domain = argv.domain;
else
  console.log('No --domain=xxx specified, taking default hostname "localhost".');
var applicationUrl = 'http://' + domain;
swagger.configure(applicationUrl, '1.0.0');

// Swagger Configuration end

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html')
})

/** -------------------- | ENABLE CORS OPTIONS | ------------------ */
let enableCORS = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, token, authorization, Content-Length, X-Requested-With, *');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};
app.use(enableCORS);

/** -------------------- | IMPORTING ROUTES | ------------------ */


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
