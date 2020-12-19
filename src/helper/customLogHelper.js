// import fs from 'fs';
// import moment from 'moment';
// import dotenv from 'dotenv';
// dotenv.config();

// exports.errorLog = (err, userId, details) => {
//     var line1 = "\r\n====================================================================================================================================================================\r\n";
//     var errDate = "Date : " + moment()._d + "\r\n";
//     var user = userId?userId:'' + "\r\n";
//     var line2 = "\r\n--------------------------------------------------------------------------------------------------------------------------------------------------------------------\r\n";
//     var error = line1 + errDate + "User Id : " + user + line2 + "\r\n "+ err + details +"\r\n";
//     fs.appendFileSync(process.env.ERROR_LOG_PATH + "_"+ moment().format("DD-MMM-YYYY") + ".txt", error);
// };