import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql';

const { DBUSER, DBPASS, JAWSDB_URL } = process.env;

const dbConfig = {
  host: 'localhost',
  port: 8080,
  user: root,
  password: "Rayaan712!",
  database: 'friend_finder'
};

let connection;

if (JAWSDB_URL) {
  connection = mysql.createConnection(JAWSDB_URL);
  console.log('JAWSDB');
} else {
  connection = mysql.createConnection(dbConfig);
  console.log('localhost');
}

connection.connect(err => {
  if (err) {
    console.log('Error: ', err);
    connection.end();
  } else {
    console.log('DB is connected');
  }
});

export default connection;