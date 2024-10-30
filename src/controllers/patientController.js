
import patientService from "../services/patientService";
let postBookingAppointment = async (req, res) => {
    try {
        let infor = await patientService.postBookingAppointment(req.body);
        return res.status(200).json(infor);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            message: "Error from sever....",
        });
    }
}

module.exports = {
    postBookingAppointment: postBookingAppointment
}