import e from "express";
import user from "../models/user";
import userService from "../services/userService";

let handleLoging = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  //check email exist
  //password nhap vao ko dung
  //return userInfor
  // access_token :JWT json web token

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; //all or id
  //check valid - >validate on server
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  console.log("get all user");
  console.log(users);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    users,
  }); //after run postman from /api/get-all-users ->log
  // {   errCode: 0, errMessage: "Ok",}
};
let handleCreateNewUser = async (req, res) => {
  let message = await userService.CreateNewUser(req.body);
  console.log(message);
  return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};
let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);

  return res.status(200).json(message);
};
let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    console.log(data);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};

///write new function code
let getallss = async (req, res) => {
  try {
    let arrs = await userService.adllcodeservice(req.query.type);
    console.log(arrs);
    return res.status(200).json(arrs);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleLoging: handleLoging,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
  getallss: getallss,
};
