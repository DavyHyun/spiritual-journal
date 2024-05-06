import {
  GROUP_CREATE_FAIL,
  GROUP_CREATE_REQUEST,
  GROUP_CREATE_SUCCESS,
  GROUP_ADD_FAIL,
  GROUP_ADD_REQUEST,
  GROUP_ADD_SUCCESS,
  GROUP_LIST_REQUEST,
  GROUP_LIST_SUCCESS,
  GROUP_LIST_FAIL,
} from "../constants/groupConstants";

export const groupCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GROUP_CREATE_REQUEST:
      return { loading: true };
    case GROUP_CREATE_SUCCESS:
      return { loading: false, success: true };
    case GROUP_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const groupAddReducer = (state = {}, action) => {
  switch (action.type) {
    case GROUP_ADD_REQUEST:
      return { loading: true };
    case GROUP_ADD_SUCCESS:
      return { loading: false, success: true };
    case GROUP_ADD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const groupListReducer = (state = {}, action) => {
  switch (action.type) {
    case GROUP_LIST_REQUEST:
      return { loading: true };
    case GROUP_LIST_SUCCESS:
      return { loading: false, groups: action.payload };
    case GROUP_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
