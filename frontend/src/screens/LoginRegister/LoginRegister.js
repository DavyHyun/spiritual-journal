import "./LoginRegister.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../actions/userActions";

const LoginRegister = () => {
  const nav = useNavigate();

  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      nav("/myjournal");
    }
  }, [userInfo]);

  const loginHandle = async () => {
    dispatch(login(username, password));
  };

  const registerHandle = async () => {
    dispatch(register(username, password));
  };

  return (
    <div className="containerLogin">
      <div className="loginBox">
        <p className="titleTextLogin">My Spiritual Journal</p>
        <div className="entryBox">
          <input
            className="formInput"
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="formInput"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttonsContainer">
          <div className="button" onClick={() => loginHandle()}>
            Login
          </div>
          <div className="button" onClick={() => registerHandle()}>
            Register
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
