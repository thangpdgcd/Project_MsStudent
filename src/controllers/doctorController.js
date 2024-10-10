import doctorService from "../services/doctorService";

//get top doctor
let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) {
    limit = 10;
  }
  try {
    let response = await doctorService.getTopDoctorHomes(limit);
    console.log("check doctor", response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errorCode: -1,
      message: "Error from sever....",
    });
  }
};
//get doctor
let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctors();
    console.log("this is get all doctor", doctors);
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return {
      errorCode: -1,
      message: "Error from sever....",
    };
  }
};
//save information doctors
let postinforDoctors = async (req, res) => {
  try {
    let response = await doctorService.saveDetailInforDoctor(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return {
      errorCode: -1,
      message: "Error from sever....",
    };
  }
};

//get doctor id
let getDetaildoctorbyId = async (req, res) => {
  try {
    let Information = await doctorService.getDetaildoctorbyId(req.query.id);
    return res.status(200).json(Information);
  } catch (error) {
    return {
      errorCode: -1,
      message: "Error from sever....",
    };
  }
};
let bulkCreateSchedule = async (req, res) => {
  try {
    let infor = await doctorService.bulkCreateSchedule(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    return res.status(200).json({
      errorCode: -1,
      message: "Error from sever....",
    });
  }
};
let getScheduleByDate = async (req, res) => {
  try {
    let inforbydate = await doctorService.getScheduleByDate(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(inforbydate);
  } catch (error) {
    return res.status(200).json({
      errorCode: -1,
      message: "Error from sever....",
    });
  }
};

let getExtraInforDoctorById = async (req, res) => {
  try {
    let inforExtra = await doctorService.getExtraInforDoctorById(req.query.doctorId);
    return res.status(200).json(inforExtra);
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      errorCode: -1,
      message: "Error from sever....",
    });
  }
}
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  postinforDoctors: postinforDoctors,
  getDetaildoctorbyId: getDetaildoctorbyId,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforDoctorById: getExtraInforDoctorById
};
