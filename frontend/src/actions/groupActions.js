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

export const createGroup =
  (groupName, groupCode) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GROUP_CREATE_REQUEST,
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
          groupName: groupName,
          groupCode: groupCode,
        }),
      };

      const response = await fetch(
        "http://localhost:3001/api/group/create",
        config
      );

      if (!response.ok) {
        const errorData = await response.json(); // Assuming server responds with JSON containing the error
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();

      dispatch({
        type: GROUP_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: GROUP_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const addToGroup = (groupCode) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GROUP_ADD_REQUEST,
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
        groupCode: groupCode,
      }),
    };

    const response = await fetch("http://localhost:3001/api/group/add", config);

    if (!response.ok) {
      const errorData = await response.json(); // Assuming server responds with JSON containing the error
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await response.json();

    dispatch({
      type: GROUP_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GROUP_ADD_FAIL,
      payload: message,
    });
  }
};

export const groupList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GROUP_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await fetch("http://localhost:3001/api/group/get", config);

    // Check if the response status is not in the 200-299 range
    if (!response.ok) {
      const errorData = await response.json(); // Assuming server responds with JSON containing the error
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await response.json();
    console.log("DATA:", data);

    dispatch({ type: GROUP_LIST_SUCCESS, payload: data.groups });
  } catch (error) {
    // This will now correctly handle both network errors and bad HTTP responses
    dispatch({
      type: GROUP_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  } finally {
  }
};