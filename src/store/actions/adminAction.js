import actionTypes from "./actionTypes";
import { getAllCodeService, getTopDoctorHomeService, SaveDetailDoctorService } from "../../services/userService";
import { createNewUserService } from "../../services/userService";
import { getAllUsers } from "../../services/userService";
import { toast } from "react-toastify";
import { deleteUserService } from "../../services/userService";
import { editUserServices } from "../../services/userService";
import { getAllDoctorService } from "../../services/userService";
import { getDetailInforDoctor } from "../../services/userService";
//get ->fetch
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

//gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");

      //errcode o ben back end
      if (res && res.errCode === 0) {
        // console.log("getsatetesss", getState);
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (error) {
      //fail call dispatch
      dispatch(fetchGenderFail());
      console.log("fetchGenderfailed", error);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});

//position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      //errcode o ben back end
      if (res && res.errCode === 0) {
        // console.log("getsatetesss", getState);
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (error) {
      //fail call dispatch
      dispatch(fetchPositionFail());
      console.log("fetchPositionFail", error);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});

//role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      //errcode o ben back end
      if (res && res.errCode === 0) {
        // console.log("getsatetesss", getState);
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (error) {
      //fail call dispatch
      dispatch(fetchRoleFail());
      console.log("fetchRoleFail", error);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});

//start doing and

//save
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      console.log("check data create user redux", res);
      //errcode o ben back end
      if (res && res.errCode === 0) {
        // console.log("getsatetesss", getState);
        toast.success("CREATE USERS SUCCESS!!");
        dispatch(saveUserSuccess());

      } else {
        toast.success("CREATE USERS FAILED!!");
        dispatch(saveUserFail());
      }
    } catch (error) {
      //fail call dispatch
      dispatch(saveUserFail());
      console.log("saveUserFail", error);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFail = () => ({
  type: actionTypes.CREATE_USER_FAIL,
});

//ALLUSER
export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("All");
      console.log("ress all users", res);
      if (res && res.errCode === 0) {
        //reverse đảo ngược thứ tự lại
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUsersFail());
      }
    } catch (error) {
      //fail call dispatch
      dispatch(fetchAllUsersFail());
      console.log("fetchAllUsersFail", error);
    }
  };
};
export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});
export const fetchAllUsersFail = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAIL,
});

//delete
export const DeleteUser = (userid) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userid);
      console.log("CHECK DELETE", res);
      if (res && res.errCode === 0) {
        //reverse đảo ngược thứ tự lại
        toast.success("DELETE USERS SUCCESS!!");
        dispatch(DeleteUsersSuccess());
      } else {
        toast.error("DELETE USERS ERROR!!");
        dispatch(DeleteUsersFail());
      }
    } catch (error) {
      //fail call dispatch
      dispatch(DeleteUsersFail());
      console.log("Delete User Failed: ", error);
    }
  };
};

export const DeleteUsersSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const DeleteUsersFail = () => ({
  type: actionTypes.DELETE_USER_FAIL,
});

//EDIT
export const EditUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserServices(data);
      console.log("CHECK EDIT", res);
      if (res && res.errCode === 0) {
        //reverse đảo ngược thứ tự lại
        toast.success("UPDATE USERS SUCCESS!!");
        dispatch(EditUsersSuccess());
      } else {
        toast.error("UPDATE USERS ERROR!!");
        dispatch(EditUsersFail());
      }
    } catch (error) {
      //fail call dispatch
      dispatch(EditUsersFail());
      console.log("UPDATE User Failed: ", error);
    }
  };
};

export const EditUsersSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const EditUsersFail = () => ({
  type: actionTypes.EDIT_USER_FAIL,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService('');
      console.log("check response gettopdoctor", res)
      if (res && res.errCode === 0) {
        dispatch(fetchTopDoctorSuccess(res.data))
      }
    } catch (e) {
      console.log("FETCH_TOP_DOCTORS_FAIL", e)
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAIL,
      })
    }
  }
}
export const fetchTopDoctorSuccess = (dataDoctors) => ({
  type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
  data: dataDoctors,
})
export const fetchTopDoctorFail = () => ({
  type: actionTypes.FETCH_TOP_DOCTORS_FAIL,
})


//Get All Doctors
export const fetchAllDoctorsStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorService();
      if (res && res.errCode === 0) {
        //reverse đảo ngược thứ tự lại
        dispatch(fetchAllDoctorsSuccess(res.data));
      } else {
        dispatch(fetchAllDoctorsFail());
      }
    } catch (error) {
      //fail call dispatch
      dispatch(fetchAllDoctorsFail());
      console.log("fetchAllDoctorsFail", error);
    }
  };
};
export const fetchAllDoctorsSuccess = (dataDT) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
  data: dataDT
}
)
export const fetchAllDoctorsFail = () => ({
  type: actionTypes.FETCH_ALL_DOCTORS_FAIL,
})

//SAVE DOCTOR
export const SaveDoctorDetail = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await SaveDetailDoctorService(data);
      console.log("Data of Save Doctor", res);
      if (res && res.errCode === 0) {
        //reverse đảo ngược thứ tự lại
        toast.success("SAVE DOCTORS SUCCESS!!");
        dispatch(fetchAllDoctorsSuccess(res.data));
      } else {
        toast.success("SAVE DOCTORS FAIL!!");
        dispatch(fetchAllDoctorsFail());
      }
    } catch (error) {
      //fail call dispatch
      dispatch(fetchAllDoctorsFail());
      console.log("SAVE DOCTORS SUCCESS!!", error);
    }
  };
};
export const SaveDoctorDetailSuccess = (dataDT) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
  data: dataDT
}
)
export const SaveDoctorDetailFail = () => ({
  type: actionTypes.FETCH_ALL_DOCTORS_FAIL,
})


//Get All code schedule
export const fetchAllScheduletTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        //reverse đảo ngược thứ tự lại
        dispatch(fetchAllScheduletTimeSuccess(res.data));
      } else {
        dispatch(fetchAllScheduletTimeFail());
      }
    } catch (error) {
      //fail call dispatch
      dispatch(fetchAllScheduletTimeFail());
      console.log("fetchAllDoctorsFail", error);
    }
  };
};
export const fetchAllScheduletTimeSuccess = (dataTime) => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
  data: dataTime
}
)
export const fetchAllScheduletTimeFail = () => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL,
})


