const nodemailer = require('nodemailer')

module.exports = {
    sendFeed: (req, res) => {
        console.log('theBody', req.body)
        const {feedValue} = req.body
        
        console.log('Feed', feedValue)
        let transporter = nodemailer.createTransport({
            sendmail: true,
            newline: 'unix',
            path: '/usr/sbin/sendmail'
        });
        transporter.sendMail({
            from: 'FeedBack' ,
            to: 'testGitBurgi@gmail.com',
            subject: 'Feedback',
            html: feedValue,
        }, (err, info) => {
            console.log(info.envelope);
            console.log(info.messageId);
            console.log('theErr', err)
        });
    }
}