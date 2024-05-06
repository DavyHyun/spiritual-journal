import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGroup, addToGroup } from "../../actions/groupActions";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./AddGroup.css";

const AddGroup = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [createN, setCreateN] = useState("");
  const [createC, setCreateC] = useState("");
  const [addC, setAddC] = useState("");

  useEffect(() => {
    if (!userInfo) {
      nav("/");
    }
  }, [userInfo, nav]);

  // const logoutHandle = async() => {
  //   dispatch(logout());
  //   nav("/");
  // }

  const groupHandle = async () => {
    if (createC.length > 0 && addC.length > 0) {
      alert("Please Enter One or the Other");
    } else if (createC.length > 0) {
      dispatch(createGroup(createN, createC));
    } else {
      dispatch(addToGroup(addC));
    }

    window.location.reload();
  };

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
          <p className="title">Create Group</p>
          <input
            className="formInput"
            type="text"
            placeholder="Group Name"
            value={createN}
            onChange={(e) => setCreateN(e.target.value)}
          />
          <input
            className="formInput"
            type="text"
            placeholder="Group Code"
            value={createC}
            onChange={(e) => setCreateC(e.target.value)}
          />
        </div>
        <div className="section">
          <p className="title">Join Code</p>
          <input
            className="formInput"
            type="text"
            placeholder="Group Code"
            value={addC}
            onChange={(e) => setAddC(e.target.value)}
          />
        </div>
        <div className="buttonGroup" onClick={() => groupHandle()}>
          Enter
        </div>
      </div>
    </div>
  );
};

export default AddGroup;
