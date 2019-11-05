const url = require('./config');

class Email {
    constructor(app) {
        this.app = app;
    }

    sendMail(post, cb = () => {}) {
        const email = this.app.get('email');
        const downloadLink  = `${url}/share/${post._id}`;

        // send mail with defined transport object
        let info = {
            from: `${post.from}`, // sender address
            to: `${post.to}`, // list of receivers
            subject: `${post.subject}`, // Subject line
            text: `${this.message}`, // plain text body
            html: `${post.form} has sent to you file. Click <a href="{${downloadLink}}">here</a> to download.` // html body
        };

        email.sendMail(info, (err, info) => {
            return cb(err, info);
        });
    }
}

module.exports = Email;