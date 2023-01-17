const defaultState = { authorized: false };

const LOGGED_IN = "LOGGED_IN";
const LOGGED_OUT = "LOGGED_OUT";

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, authorized: true };
    case LOGGED_OUT:
      return { ...state, authorized: false };
    default:
      return state;
  }
};

export const onLogInAction = () => ({ type: LOGGED_IN });
export const onLogOutAction = () => ({ type: LOGGED_OUT });

export default authReducer;
