import {
  JOURNAL_UPDATE_REQUEST,
  JOURNAL_UPDATE_SUCCESS,
  JOURNAL_UPDATE_FAIL,
  JOURNAL_CREATE_FAIL,
  JOURNAL_CREATE_REQUEST,
  JOURNAL_CREATE_SUCCESS,
  JOURNAL_DELETE_FAIL,
  JOURNAL_DELETE_REQUEST,
  JOURNAL_DELETE_SUCCESS,
  JOURNAL_LIST_FAIL,
  JOURNAL_LIST_REQUEST,
  JOURNAL_LIST_SUCCESS,
  JOURNAL_GROUP_REQUEST,
  JOURNAL_GROUP_SUCCESS,
  JOURNAL_GROUP_FAIL,
} from "../constants/journalConstants";

export const journalCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case JOURNAL_CREATE_REQUEST:
      return { loading: true };
    case JOURNAL_CREATE_SUCCESS:
      return { loading: false, success: true };
    case JOURNAL_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const journalPersonalReducer = (state = { journals: [] }, action) => {
  switch (action.type) {
    case JOURNAL_LIST_REQUEST:
      return { loading: true };
    case JOURNAL_LIST_SUCCESS:
      return { loading: false, journals: action.payload };
    case JOURNAL_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const journalGroupReducer = (state = { journals: [] }, action) => {
  switch (action.type) {
    case JOURNAL_GROUP_REQUEST:
      return { loading: true };
    case JOURNAL_GROUP_SUCCESS:
      return { loading: false, journals: action.payload };
    case JOURNAL_GROUP_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
