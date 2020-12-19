import https from'https';
import dotenv from 'dotenv';
dotenv.config();


exports.sendSMS = (mobile, msg) => {
    const sms = {
        username: process.env.SMS_USERNAME,
        password: process.env.SMS_PASSWORD,
        sender: process.env.SMS_SENDER,
        priority: process.env.SMS_PRIORITY,
        dnd: process.env.SMS_DND,
        unicode: process.env.SMS_UNICODE,
    }

    let mobileNo = mobile;
    let message = encodeURIComponent(msg);

    let dataURL = process.env.SMS_URL+"?username=" + sms.username + "&password=" + sms.password + "&sender=" + sms.sender + "&priority=" + sms.priority + "&to=" + mobileNo + "&message=" + message + "&dnd=" + sms.dnd + "&unicode=" + sms.unicode;
    // var dataURL = "https://kit19.com/ComposeSMS.aspx?username=atozit570553&password=atoz6602&sender=atozit&to=8000641661&message=This%20is%20wedding%20msg%20by%20HarishMahajan&priority=1&dnd=1&unicode=0"
    let options = {
        method: process.env.SMS_METHOD,
        host: process.env.SMS_HOST,
        path: dataURL,
    }
    
    https.request(options, (result) =>{
        result.setEncoding('utf8');
        result.on('data', (chunk) =>{
            console.log("sms sent");
            // res.send({ message: "sms sent" });
            // res.json("sent")
        });
    }).end();
};