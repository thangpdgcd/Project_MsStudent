import actionTypes from "../actions/actionTypes";

const initialState = {
  //khi nao api dc goi xong
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let coppyState = { ...initialState };
      coppyState.isLoadingGender = true;
      console.log("fire fetch gender start", action);
      return {
        ...coppyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      console.log("fire fetch gender success", state);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      console.log("fire fetch gender failed", action);
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      console.log("fire fetch positions success", state);
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAIL:
      console.log("fire fetch positions fail", state);
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      console.log("fire fetch positions success", state);
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAIL:
      console.log("fire fetch roles fail", state);
      state.roles = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAIL:
      state.users = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
