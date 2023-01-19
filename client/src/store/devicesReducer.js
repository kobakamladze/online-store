const defaultState = { count: 0, rows: [] };

const ADD_DEVICES = "ADD_DEVICES";
const CLEAN_DEVICES = "CLEAN_DEVICES";

const devicesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_DEVICES:
      return { ...state, ...action.payload };
    case CLEAN_DEVICES:
      return { ...state };
    default:
      return state;
  }
};

export const addDevicesAction = (payload) => ({
  type: ADD_DEVICES,
  payload,
});

export const cleanDevicesAction = () => ({
  type: CLEAN_DEVICES,
});

export default devicesReducer;
