import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("api/login", { email, password }); //api run from backend to reactjs after handle from nodejs
};

const getAllUsers = (inputId) => {
  //template string
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

//create
const createNewUserService = (data) => {
  return axios.post("api/create-new-user", data);
};

const deleteUserService = (userId) => {
  // return axios.delete('/api/delete-user',{
  //   data:{
  //     id:userId
  //   }
  // });
  return axios.delete("/api/delete-user",
    {
      where: {
        id: userId,
      }
    })
}
export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService };
