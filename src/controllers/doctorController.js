import doctorServie from "../services/doctorService";


let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) {
        limit = 10;
    }
    try {
        let response = await doctorServie.getTopDoctorHome(+limit);
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
module.exports = {
    getTopDoctorHome: getTopDoctorHome
}