'use strict';
const nodemailer = require('nodemailer');

// nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'qq',//邮箱的服务商
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "994117985@qq.com", // 默认邮箱
            pass: 'wrwpohhekwambbci' // //smtp 授权码
        }
    });

    function sendmail(mail,msg){
        return new Promise((resolve,reject)=>{
        	    // 发送邮件相关信息
    let mailOptions = {
        from: '994117985@qq.com', // sender address
        to: mail, // list of receivers
        subject: '洋码头注册验证码', // Subject line
        text: "您的验证码是:"+msg+"；    有效期为1分钟。", // plain text body
    };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {reject(error)}
                resolve('ok')
            })
        })
    }
//  console.log(sendmail("994117985@qq.com",'123'));
   module.exports={sendmail};
// });


