import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

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
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user already exist
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password", "firstName", "lastName"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          //compare password: dùng cách 1 hay cách 2 đều chạy đúng cả =))
          // Cách 1: dùng asynchronous (bất đồng bộ)
          let check = await bcrypt.compare(password, user.password);

          // Cách 2: dùng synchronous  (đồng bộ)
          // let check = bcrypt.compareSync(password, user.password);

          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK";

            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User not found`;
        }
      } else {
        //return error
        userData.errCode = 1;
        userData.errMessage = `Your's Email isn't exist in our system, plz try other email`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
//get a list users
let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      //check condition
      if (userId === "All") {
        users = db.User.findAll({
          attributes: {
            exclude: ["password"],
            //exclude password you shound remove it in userdb
          },
        });
      }
      if (userId && userId !== "All") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
            //exclude password you shound remove it in userdb
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
//create new user
let CreateNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email is exist
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage:
            "your email is already in used, please try another email!",
        });
      }
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
        positionId: data.positionId,
        image: data.avatar
      });
      resolve({
        errCode: 0,
        message: "Ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};
//delete
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let foundUser = await db.User.findOne({
      where: { id: userId },
    });
    if (!foundUser) {
      resolve({
        errCode: 2,
        errMessage: "The user does not exist",
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      errCode: 0,
      errMessage: "The user is deleted successfully",
    });
  });
};
//update
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    //check valid if not id user can not update
    if (!data.id || !data.roleId || !data.positionId || !data.gender) {
      resolve({
        errCode: 1,
        errMessage: "Can not Search User",
      });
    }
    let user = await db.User.findOne({
      where: {
        id: data.id,
      },
      //set raw
      raw: false,
    });
    if (user) {
      user.id = data.id;
      user.email = data.email;
      user.password = data.password;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;
      user.phonenumber = data.phonenumber;
      user.gender = data.gender;
      user.roleId = data.roleId;
      user.positionId = data.positionId;
      //check
      if (data.avatar) {
        user.image = data.avatar;
      }
      await user.save();
      resolve({
        errCode: 0,
        errMessage: `Update users successfully!`,
      });
    } else {
      resolve({
        errCode: 1,
        errMessage: `Update users not found`,
      });
    }
  });
};
let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let res = {};
        let allCode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allCode;
        resolve(res);
      }
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

//this is writing new code
let adllcodeservice = (Type) => {
  return new Promise(async (resolve, reject) => {
    try {
      let arr = {};
      let allscode = await db.Allcode.findAll({ type: Type });
      //if run connect it will successfully!
      arr.errCode = 0;
      arr.data = allscode;
      resolve(arr);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  CreateNewUser: CreateNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
  getAllCodeService: getAllCodeService,
  adllcodeservice: adllcodeservice,
};
