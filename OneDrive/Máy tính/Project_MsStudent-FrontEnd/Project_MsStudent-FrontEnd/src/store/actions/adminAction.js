import actionTypes from "./actionTypes";
import { getAllCodeService } from "../../services/userService";

//get ->fetch
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
  {
    return async (dispatch, getState) => {
      try {
        dispatch({
          type: actionTypes.FETCH_GENDER_START,
        })
        let res = await getAllCodeService("GENDER");
        console.log("ressssss" + res)
        if (res && res.errorCode === 0) {
          console.log("hoidanitcheck get state: ", getState);
          dispatch(fetchGenderSuccess(res.data));
        } else {
          dispatch(fetchGenderFail());
        }
        console.log("log res", res);
      } catch (error) {
        //trong truong hop fail
        dispatch(fetchGenderFail());
        console.log("fetgenderstart", error);
      }
    };
  }
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});

//start doing and
