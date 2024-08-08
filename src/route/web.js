import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);

  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);

  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  //api login
  router.post("/api/login", userController.handleLoging);

  //get all user -> after get link api
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);

  //edit
  router.put("/api/edit-user", userController.handleEditUser);

  //delete
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.getAllCode);

  //new route test
  router.get("/api/allscode", userController.getallss);


  //api topdoctorhome
  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome)
  return app.use("/", router);
};

module.exports = initWebRoutes;
