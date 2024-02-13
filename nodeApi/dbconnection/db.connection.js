var mysql = require('mysql2');


var pool = mysql.createPool({
  connectionLimit:4,
  host: "localhost",
  user: "root",
  password: "Shivani",
  database:"mynodedb"
});

pool.getConnection((err,connection)=> {
  if(err)
  throw err;
  console.log('Database connected successfully');
  connection.release();
});

module.exports = pool;

// host: 'localhost',
//     user: 'root',
//     password: 'Shivani',
//     database: 'mynodedb',
//     connectionLimit: 10