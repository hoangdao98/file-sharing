const smtp = {
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'apikey', // generated ethereal user
        pass: '' // generated ethereal password
    }
  }

const url = 'http://localhost:4000';

module.exports = {
    smtp,
    url
}