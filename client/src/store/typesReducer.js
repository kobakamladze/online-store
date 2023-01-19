const defaultState = [];

const ADD_TYPES = "ADD_TYPES";
const CLEAN_TYPES = "CLEAN_TYPES";

const typesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TYPES:
      return [...state, ...action.payload];
    case CLEAN_TYPES:
      return [];
    default:
      return state;
  }
};

export const addTypesAction = (payload) => ({
  type: ADD_TYPES,
  payload,
});

export const cleanTypesAction = () => ({
  type: CLEAN_TYPES,
});

export default typesReducer;
