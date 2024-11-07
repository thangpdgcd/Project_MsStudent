import { defaults } from "lodash";
import db from "../models/index";
require('dotenv').config();

let postBookingAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check valid email
            if (!data.email
                || !data.date
                || !data.timeType
                || !data.doctorId
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "missing parameter!..."
                })
            } else {
                //upsert patient
                let user = await db.User.findOrCreate({
                    where: {
                        email: data.email
                    },
                    //defaults là một khóa (key) trong đối tượng, dùng để định nghĩa một số giá trị mặc định.
                    defaults: {
                        email: data.email,
                        roleId: "R3"
                    }
                })
                console.log("check user patient: ", user[0]);
                resolve({
                    // data: user,
                    errCode: 0,
                    errMessage: "Save patient Successfull!"
                });

                // // create a booking
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id,
                        },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }
                    })
                }
                //1. if (user && user[0]):
                //Điều kiện này kiểm tra xem biến user có tồn tại
                // và có ít nhất một phần tử(tức là user[0] không phải là undefined).
                //Điều này thường có nghĩa là bạn đang kiểm tra xem có người dùng nào đã được tìm thấy trong cơ sở dữ liệu không.
                //2.where: { patientID: user[0].id }:
                // chỉ định tới user tồn tại 

                //3.defaults: {...}:
                //Đây là một đối tượng chứa các giá trị mặc định sẽ được gán cho bản ghi mới
            }
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    postBookingAppointment: postBookingAppointment
}