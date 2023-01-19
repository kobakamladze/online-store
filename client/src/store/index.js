import { combineReducers, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import authReducer from "./authReducer";
import typesReducer from "./typesReducer";
import brandsReducer from "./brandsReducer";
import devicesReducer from "./devicesReducer";

const store = createStore(
  combineReducers({
    authorized: authReducer,
    types: typesReducer,
    brands: brandsReducer,
    devices: devicesReducer,
  }),
  composeWithDevTools()
);

export default store;
