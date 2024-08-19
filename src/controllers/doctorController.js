import doctorServie from "../services/doctorService";

//get top doctor
let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) {
        limit = 10;
    }
    try {
        let response = await doctorServie.getTopDoctorHomes(limit);
        console.log("check doctor", response)
        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            message: "Error from sever...."
        })
    }
}
//get doctor
let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorServie.getAllDoctors()
        console.log("this is get all doctor", doctors)
        return res.status(200).json(doctors)
    } catch (error) {
        console.log(error)
        return ({
            errorCode: -1,
            message: "Error from sever...."
        })
    }
}
//save information doctors
let postinforDoctors = async (req, res) => {
    try {
        let response = await doctorServie.SaveDetailInforDoctor(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return ({
            errorCode: -1,
            message: "Error from sever...."
        })
    }
}

//get doctor id
let getDetaildoctorbyId = async (req, res) => {
    try {
        let Information = await doctorServie.getDetaildoctorbyId(req.query.id)
        return res.status(200).json(Information);
    } catch (error) {
        return ({
            errorCode: -1,
            message: "Error from sever...."
        })
    }
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postinforDoctors: postinforDoctors,
    getDetaildoctorbyId: getDetaildoctorbyId
}