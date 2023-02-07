const defaultState = { id: "", email: "" };

const LOGGED_IN = "LOGGED_IN";
const LOGGED_OUT = "LOGGED_OUT";

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return { id: action.payload.id, email: action.payload.email };
    case LOGGED_OUT:
      return { id: "", email: "" };
    default:
      return state;
  }
};

export const onLogInAction = payload => ({ type: LOGGED_IN, payload });
export const onLogOutAction = () => ({ type: LOGGED_OUT });

export default authReducer;
