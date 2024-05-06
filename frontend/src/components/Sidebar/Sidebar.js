import React, { useEffect, ueseState } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { groupList } from "../../actions/groupActions";

const Section = ({ title, link }) => {
  return (
    <NavLink
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textDecoration: "none",
      }}
      to={link}
    >
      <p
        style={{
          alignItems: "center",
          textAlign: "left",
          width: "100%",
          marginLeft: "20%",
          height: "40px",
          display: "flex",
        }}
        className="text"
      >
        {title}
      </p>
    </NavLink>
  );
};

const Sidebar = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const group = useSelector((state) => state.groupList);
  const { loading, groups, error } = group;

  useEffect(() => {
    dispatch(groupList());
  }, [dispatch, userInfo]);
  return (
    <div
      style={{
        display: "flex",
        flex: 0.24,
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <Section title="My Journal" link="/myjournal" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          width: "100%",
          marginTop: "2%",
          marginBottom: "7%",
        }}
      >
        <div
          style={{
            height: "1px",
            backgroundColor: "black",
            width: "10%",
            marginRight: "2.5%",
          }}
        />
        My Groups
        <div
          style={{
            height: "1px",
            backgroundColor: "black",
            width: "30%",
            marginLeft: "2.5%",
          }}
        />
      </div>
      {groups?.map((group) => (
        <Section title={group.groupName} link={`/mygroups/${group._id}`} />
      ))}
      <Section title="+ Add New" link="/addgroup" />
    </div>
  );
};
export default Sidebar;
