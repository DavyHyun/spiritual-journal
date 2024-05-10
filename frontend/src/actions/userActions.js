import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

const LOCAL = false;

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    var response;

    if (LOCAL) {
      response = await fetch("http://localhost:3001/api/users/login", config);
    } else {
      response = await fetch(
        "https://spiritual-journal.onrender.com/api/users/login",
        config
      );
    }

    // Check if the response status is not in the 200-299 range
    if (!response.ok) {
      const errorData = await response.json(); // Assuming server responds with JSON containing the error
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await response.json();

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    // This will now correctly handle both network errors and bad HTTP responses
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  } finally {
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    var response;

    if (LOCAL) {
      response = await fetch("http://localhost:3001/api/users", config);
    } else {
      response = await fetch(
        "https://spiritual-journal.onrender.com/api/users",
        config
      );
    }

    // Check if the response status is not in the 200-299 range
    if (!response.ok) {
      const errorData = await response.json(); // Assuming server responds with JSON containing the error
      throw new Error(errorData.message || "Something went wrong");
    }

    const data = await response.json();

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    // This will now correctly handle both network errors and bad HTTP responses
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  } finally {
  }
};
