const defaultState = [];

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

export { ACTION_TYPES };

export const typesAction = (actionType) => ({ type: ACTION_TYPES.actionType });

export default authReducer;
