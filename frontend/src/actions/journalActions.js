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

export const createJournalAction =
  (verse, passage, content, title, selectedGroups) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: JOURNAL_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          verse: verse,
          passage: passage,
          content: content,
          title: title,
          groups: selectedGroups,
        }),
      };

      // change to correct syntax
      const response = await fetch(
        "http://localhost:3001/api/journal/create",
        config
      );

      // Check if the response status is not in the 200-299 range
      if (!response.ok) {
        const errorData = await response.json(); // Assuming server responds with JSON containing the error
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();

      dispatch({
        type: JOURNAL_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: JOURNAL_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const listPersonal = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOURNAL_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await fetch(
      "http://localhost:3001/api/journal/personal",
      config
    );

    // Check if the response status is not in the 200-299 range
    if (!response.ok) {
      const errorData = await response.json(); // Assuming server responds with JSON containing the error
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await response.json();

    dispatch({
      type: JOURNAL_LIST_SUCCESS,
      payload: data.journals,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: JOURNAL_LIST_FAIL,
      payload: message,
    });
  }
};

export const listGroup = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOURNAL_GROUP_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({
        groupID: id,
      }),
    };

    const response = await fetch(
      "http://localhost:3001/api/journal/group",
      config
    );

    // Check if the response status is not in the 200-299 range
    if (!response.ok) {
      const errorData = await response.json(); // Assuming server responds with JSON containing the error
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await response.json();

    dispatch({
      type: JOURNAL_GROUP_SUCCESS,
      payload: data.journals,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: JOURNAL_GROUP_FAIL,
      payload: message,
    });
  }
};
