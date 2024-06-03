import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  position: [],
  isLoadingGender: false
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIDED:
      state.isLoadingGender = true;
      state.genders = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
