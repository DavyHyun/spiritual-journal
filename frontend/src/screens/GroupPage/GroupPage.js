import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import Header from "../../components/Header/Header";
import journals from "../../data.js";
import Sidebar from "../../components/Sidebar/Sidebar";

const GroupPage = () => {
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
        {journals?.reverse().map((note) => (
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
                  {note.verse} | {note.title} | {note.author}
                </span>
                <span style={{ fontSize: "12px" }}>{note.date}</span>
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
