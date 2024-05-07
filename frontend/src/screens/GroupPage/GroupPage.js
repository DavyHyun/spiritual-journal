import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../../actions/userActions";
import Header from "../../components/Header/Header";
import journals from "../../data.js";
import Sidebar from "../../components/Sidebar/Sidebar";
import { listGroup } from "../../actions/journalActions";

const GroupPage = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const journalGroup = useSelector((state) => state.journalGroup);
  const { loading, journals, error } = journalGroup;

  useEffect(() => {
    console.log(id);
    dispatch(listGroup(id));
    console.log("J:", journals);
    if (!userInfo) {
      nav("/");
    }
  }, [userInfo, nav]);

  // const logoutHandle = async() => {
  //   dispatch(logout());
  //   nav("/");
  // }

  const formatDate = (date) => {
    let dateString = date + "";
    let dateF = new Date(dateString);

    let formattedDate = dateF.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formattedDate;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        // alignItems: "center",
      }}
    >
      <Sidebar />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          alignItems: "center",
          flex: 0.8,
          marginBottom: "5%",
        }}
      >
        {journals
          ?.slice()
          .reverse()
          .map((note) => (
            <Accordion defaultActiveKey={["0"]} style={{ width: "90%" }}>
              <Accordion.Item eventkey="0">
                <Accordion.Header
                  style={{
                    display: "flex",
                    height: "70px",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ width: "85%", textAlign: "left" }}>
                    {note.verse}
                    {note.title ? ` | ${note.title}` : ""}
                  </span>
                  <span style={{ fontSize: "12px" }}>
                    {formatDate(note.createdAt)}
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  <p
                    style={{
                      fontSize: "15px",
                      marginTop: "1%",
                    }}
                  >
                    {note.passage}
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                      marginTop: "3%",
                      marginBottom: "2%",
                    }}
                  >
                    {note.content}
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
      </div>
    </div>
  );
};

export default GroupPage;
