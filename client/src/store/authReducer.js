const defaultState = false;

const LOGGED_IN = "LOGGED_IN";
const LOGGED_OUT = "LOGGED_OUT";

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return true;
    case LOGGED_OUT:
      return false;
    default:
      return state;
  }
};

export const onLogInAction = () => ({ type: LOGGED_IN });
export const onLogOutAction = () => ({ type: LOGGED_OUT });

export default authReducer;
