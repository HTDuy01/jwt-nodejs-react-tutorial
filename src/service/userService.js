import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

// create the connection, specify bluebird as Promise

const salt = bcrypt.genSaltSync(10);

const hashUserPassWord = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassWord(password);
  const connection = await mysql.createConnection({ host: "localhost", user: "root", database: "jwt", Promise: bluebird });

  // simple query
  try {
    const [rows, fields] = await connection.execute("INSERT INTO users (email, password, username) VALUES(?, ?, ?)",[email, hashPass, username]);
    
  } catch (error) {
    console.log("error", error);
  }

};

const getUserList = async () => {
  const connection = await mysql.createConnection({ host: "localhost", user: "root", database: "jwt", Promise: bluebird });

  let users = [];

  try {
    const [rows, fields] = await connection.execute("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.log("error", error);
  }
};

const deleteUser = async (id) => {
  const connection = await mysql.createConnection({ host: "localhost", user: "root", database: "jwt", Promise: bluebird });


  try {
    const [rows, fields] = await connection.execute("DELETE FROM users WHERE id=?",[id]);
    return rows;
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = {
  createNewUser,
  getUserList,
  deleteUser
};
