/**
 * Created by Administrator on 2017/5/11.
 */

var nodemailer = require('nodemailer');


var smtpConfig = {
  host: 'smtp.baidu.com',
  //port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: 'mobile-reportdata',
    pass: '3%redDog$#$6'
  }
};

var transporter = nodemailer.createTransport(smtpConfig)

// verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});