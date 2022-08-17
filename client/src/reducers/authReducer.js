import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = { authDatata: null }, action) => {
  switch (action.type) {
    case AUTH:
      console.log("authreducer ", action?.data);
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
