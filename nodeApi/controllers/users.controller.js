const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../dbconnection/db.connection')
const nodemailer = require('nodemailer');

const userSingup = (req, res) => {
  const { email, username, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    console.log(password, err, hashedPassword);
    if (err) {
      return res.status(500).json({ error: 'Error hashing password' });
    }
    const insertUserQuery = `INSERT INTO users (email,username, password) VALUES ('${email}','${username}', '${hashedPassword}')`;
    db.query(insertUserQuery, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating user' });
      }
      console.log('Insert successful. Inserted ID:', result);
      // Generate JWT token
      const token = jwt.sign({ username }, 'Shiv', { expiresIn: '1h' });

      res.json({ token });
    });
  })
}
const userSingin = (req, res) => {
  const { email, username, password } = req.body;
  
    const qry = `select * from users where email='${email}'`;
    db.query(qry, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error getting user' });
      }
      console.log('data', result);
      // const token = jwt.sign({ username }, 'Shiv', { expiresIn: '1h' });

      res.json({ result });
    });
}
const getUsers = (req, res) => {
  const users = [{ id: 1, username: 'john_doe' }, { id: 2, username: 'jane_doe' }];
  res.json(users);
};

const getUserById = (req, res) => {
  const userId = req.params.id;
  const user = { id: userId, username: 'user_' + userId };
  res.json(user);
};

const sendMail= async (req, res) => {
   var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'eproposal-meg@meghalaya.gov.in',
        pass: 'Q2#yR7#wA7'
      } ,
      port: 587,
    tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2"
    }
    });
  // setup email data with unicode symbols
  let mailOptions = {
    from: 'eproposal-meg@meghalaya.gov.in',
    to: 'mohd.shariq.humanitics@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email from Nodemailer!'
};

transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
      console.log(error);
  } else {
      console.log('Email sent: ' + info.response);
  }
});

};
module.exports = { getUsers, getUserById, userSingup ,userSingin,sendMail};
