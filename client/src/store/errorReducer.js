const defaultState = false;

const ON_ERROR = "ON_ERROR";
const CLEAN_ERROR = "CLEAN_ERROR";

const errorReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ON_ERROR:
      return true;
    case CLEAN_ERROR:
      return false;
    default:
      return state;
  }
};

export const onErrorOccasionAction = () => ({ type: ON_ERROR });
export const onErrorCleanAction = () => ({ type: CLEAN_ERROR });

export default errorReducer;
