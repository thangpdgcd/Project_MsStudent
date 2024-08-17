
import e from "express";
import db from "../models/index";

//get top doctor
let getTopDoctorHomes = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: {
                    roleId: "R2",
                },
                order: [["phonenumber", "DESC",]],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (error) {
            reject(error)
        }
    })
}

// let getalldoctor
let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: {
                    roleId: "R2"
                },
                attributes:
                    { exclude: ["image", "password"] }
            })
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (error) {
            reject(error)
        }
    })
}

//
let SaveDetailInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    doctorId: inputData.doctorId,
                    description: inputData.description,
                })
                resolve({
                    errCode: 0,
                    errMessage: "Save Information Successed!"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getTopDoctorHomes: getTopDoctorHomes,
    getAllDoctors: getAllDoctors,
    SaveDetailInforDoctor: SaveDetailInforDoctor,
}