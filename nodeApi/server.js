const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db=require('./dbconnection/db.connection')
const port = process.env.PORT || 4000;
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');

app.use('/api', require('./routers/users.route'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});