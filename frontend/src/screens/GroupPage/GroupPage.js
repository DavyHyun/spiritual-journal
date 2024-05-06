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
                  justifyContent: "center",
                }}
              >
                {note.verse}
              </Accordion.Header>
              <Accordion.Body>
                <h4>
                  <Badge bg="success" text="light">
                    Category - {note.category}{" "}
                  </Badge>
                </h4>

                <blockquote className="blockquote mb-0">
                  <p>{note.content}</p>
                  <footer className="blockquote-footer">
                    Created on <cite title="Source Title">04-24-2024</cite>
                  </footer>
                </blockquote>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default GroupPage;
