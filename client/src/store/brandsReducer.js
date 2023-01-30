const defaultState = [];

const ADD_BRANDS = "ADD_BRANDS";

const brandsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_BRANDS:
      return [...action.payload.filter(brand => brand.active)];
    default:
      return state;
  }
};

export const addBrandAction = payload => {
  console.log(payload.filter(brand => brand.active));

  return {
    type: ADD_BRANDS,
    payload,
  };
};

export default brandsReducer;
