// import { createLogger, transports, format } from 'winston';
// import { json } from 'body-parser';
// import winstonmongodb from 'winston-mongodb';
// import dotenv from 'dotenv';
// dotenv.config();

// const logger = createLogger({
//     transports: [
//         new transports.File({
//             filename: 'info.log',
//             level: 'info',
//             format: format.combine(format.timestamp(), format.json())
//         }),
//         new transports.MongoDB({
//             level: 'error',
//             db: 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME,
//             collection: 'errorLog',
//             format: format.combine(format.timestamp(), format.json())
//         })
//     ]
// })

// module.exports = logger;