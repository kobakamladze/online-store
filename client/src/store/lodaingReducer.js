const defaultState = true;

const START_LOADING = "START_LOADING";
const STOP_LOADING = "STOP_LOADING";

const loadingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case START_LOADING:
      return true;
    case STOP_LOADING:
      return false;
    default:
      return state;
  }
};

export const onLoadingStartAction = () => ({ type: START_LOADING });
export const onLoadingStopAction = () => ({ type: STOP_LOADING });

export default loadingReducer;
