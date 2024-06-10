import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createGroup,
  addToGroup,
  groupCodes,
} from "../../actions/groupActions";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./AddGroup.css";

const AddGroup = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const groupCode = useSelector((state) => state.groupCodes);
  const { codes } = groupCode;

  const [createN, setCreateN] = useState("");
  const [createC, setCreateC] = useState("");
  const [addC, setAddC] = useState("");

  useEffect(() => {
    dispatch(groupCodes());
    if (!userInfo) {
      nav("/");
    }
  }, [userInfo, nav]);

  // const logoutHandle = async() => {
  //   dispatch(logout());
  //   nav("/");
  // }

  const groupHandle = async () => {
    if (codes.groupCodes.includes(createC)) {
      alert("CODE ALREADY EXISTS");
      return;
    }
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
    <div className="mainBigContainer">
      <Sidebar />
      <div className="createGroup">
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
