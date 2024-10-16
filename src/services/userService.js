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
  console.log("Data Create Successfully!", data);
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userid) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userid,
    },
  });
};

const editUserServices = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
//api/get-all-doctors

const getAllDoctorService = () => {
  return axios.get(`/api/get-all-doctors`);
};
const SaveDetailDoctorService = (data) => {
  return axios.post(`/api/save-infor-doctors`, data);
};
const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraInforDoctorById = (doctorId) => {
  return axios.get(
    `/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`
  );
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserServices,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctorService,
  SaveDetailDoctorService,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraInforDoctorById
};
