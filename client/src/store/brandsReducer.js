const defaultState = [];

const ADD_BRANDS = "ADD_BRANDS";
const CLEAN_BRANDS = "CLEAN_BRANDS";

const brandsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_BRANDS:
      return [...state, ...action.payload];
    case CLEAN_BRANDS:
      return [];
    default:
      return state;
  }
};

export const addBrandsAction = (payload) => ({
  type: ADD_BRANDS,
  payload,
});

export const cleanBrandsAction = () => ({
  type: CLEAN_BRANDS,
});

export default brandsReducer;
