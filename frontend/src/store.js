import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {
  journalCreateReducer,
  journalPersonalReducer,
  journalGroupReducer,
  journalDeleteReducer,
} from "./reducers/journalReducer";
import {
  groupCreateReducer,
  groupAddReducer,
  groupListReducer,
} from "./reducers/groupReducer";
import { composeWithDevTools } from "@redux-devtools/extension";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  journalCreate: journalCreateReducer,
  groupCreate: groupCreateReducer,
  groupAdd: groupAddReducer,
  groupList: groupListReducer,
  journalPersonal: journalPersonalReducer,
  journalGroup: journalGroupReducer,
  journalDelete: journalDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
