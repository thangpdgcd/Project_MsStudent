import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassWordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPassWordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender,
        roleId: data.roleId,
      });
      resolve("create new user succeed");
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      //lưu ý, truyền vào đúng password cần hash
      // let hashPassWord = await bcrypt.hashSync("B4c0/\/", salt); => copy paste mà ko edit nè
      let hashPassWord = await bcrypt.hashSync(password, salt);

      resolve(hashPassWord);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        attributes: {
          exclude: ["password"],
          //exclude password you shound remove it in userdb
        },
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });

      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          id: data.id,
        },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;

        await user.save();
        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        // Gọi phương thức destroy ở đây
        await db.User.destroy({
          where: {
            id: userId,
          },
        });
      }
      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

// const deleteUser = async (req, res) => {
//   const user = await req.params.id;
//   const userId = await user.destroy({
//     where: {
//       id: userId,
//     },
//   });
//   console.log("delete by id user successfully");
//   return deleteUser;

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};
