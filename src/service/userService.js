import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models/index";

// create the connection, specify bluebird as Promise

const salt = bcrypt.genSaltSync(10);

const hashUserPassWord = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassWord(password);

  // simple query
  try {
    await db.User.create({
      username: username,
      email: email,
      password: hashPass,
    })
  } catch (error) {
    console.log("error", error);
  }

};

const getUserList = async () => {
  let users = []

  users = await db.User.findAll();
  return users
  // const connection = await mysql.createConnection({ host: "localhost", user: "root", database: "jwt", Promise: bluebird });

  // try {
  //   const [rows, fields] = await connection.execute("SELECT * FROM user");
  //   return rows;
  // } catch (error) {
  //   console.log("error", error);
  // }

  
};

const deleteUser = async (userID) => {
  await db.User.destroy({
    where: {
      id: userID
    }
  })

  // const connection = await mysql.createConnection({ host: "localhost", user: "root", database: "jwt", Promise: bluebird });


  // try {
  //   const [rows, fields] = await connection.execute("DELETE FROM user WHERE id=?",[id]);
  //   return rows;
  // } catch (error) {
  //   console.log("error", error);
  // }
}
const getUserById = async (id) => {
  let user = {}

  user = await db.User.findOne(
    { where: { id: id } }
  )
  return user.get({plain: true})
  // const connection = await mysql.createConnection({ host: "localhost", user: "root", database: "jwt", Promise: bluebird });


  // try {
  //   const [rows, fields] = await connection.execute("Select * FROM user WHERE id=?",[id]);
  //   return rows;
  // } catch (error) {
  //   console.log("error", error);
  // }
}
 
const updateUserInfo = async (email, username,id ) => {
  // const connection = await mysql.createConnection({ host: "localhost", user: "root", database: "jwt", Promise: bluebird });

  // try {
  //   const [rows, fields] = await connection.execute("UPDATE user SET email = ?, username = ? WHERE id = ? ",[email,username,id]);
  //   return rows;
  // } catch (error) {
  //   console.log("error", error);
  // }

  await db.User.update(
    { email: email, username: username },
    {
    where: {
      id: id
    }
  });
 }

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfo
};
