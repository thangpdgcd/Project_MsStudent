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
  let id = req.body.id; //all or id

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

module.exports = {
  handleLoging: handleLoging,
  handleGetAllUsers: handleGetAllUsers,
};
