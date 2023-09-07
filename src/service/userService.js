import bcrypt from "bcryptjs";
import mysql from "mysql2";

const salt = bcrypt.genSaltSync(10);

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});

const hashUserPassWord = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const createNewUser = (email, password, username) => {
  let hashPass = hashUserPassWord(password);

  // simple query
  connection.query("INSERT INTO users (email, password, username) VALUES(?, ?, ?)", [email, hashPass, username], function (err, results, fields) {
    if (err) {
      console.error(err);
    }
  });
};

const getUserList = () => {
  let users = [];

  connection.query("Select * from users", function (err, results, fields) {
    if (err) {
      console.error(err);
    }
  });
};

module.exports = {
  createNewUser,
};
