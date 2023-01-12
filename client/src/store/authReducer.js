const defaultState = { authorized: false };

const ACTION_TYPES = {
  LOGGED_IN: "LOGGED_IN",
  LOGGED_OUT: "LOGGED_OUT",
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGGED_IN:
      return { ...state, userAuthStatus: true };
    case ACTION_TYPES.LOGGED_OUT:
      return { ...state, userAuthStatus: false };
    default:
      return { state };
  }
};

export const logInAction = () => ({ type: ACTION_TYPES.LOGGED_IN });
export const logOutAction = () => ({ type: ACTION_TYPES.LOGGED_OUT });

export default authReducer;
