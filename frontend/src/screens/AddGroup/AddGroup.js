import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./AddGroup.css";

const AddGroup = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      nav("/");
    }
  }, [userInfo, nav]);

  // const logoutHandle = async() => {
  //   dispatch(logout());
  //   nav("/");
  // }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <Sidebar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          flex: 0.8,
        }}
      >
        <div className="section">
          <p className="title">Create Code</p>
          <input
            className="formInput"
            type="text"
            placeholder="Enter Code Here..."
          />
        </div>
        <div className="section">
          <p className="title">Join Code</p>
          <input
            className="formInput"
            type="text"
            placeholder="Enter Code Here..."
          />
        </div>
        <div className="buttonGroup" onClick={() => {}}>
          Enter
        </div>
      </div>
    </div>
  );
};

export default AddGroup;
