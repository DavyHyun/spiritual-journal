import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Header.css'
import { logout } from "../../actions/userActions";
import logo from "../../misc/images/loginNotebook.png"
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
   <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href="/myjournal" className="header">
          <img src={logo} style={{
            height: "100px",
            marginLeft: "3.5%",
            marginRight: "2%"
          }}/>
          My Spiritual Journal
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link href="/newentry">+ new entry</Nav.Link>
            <Nav.Link onClick={() => logoutHandler()}>
              <FiLogOut style={{
                marginLeft: '10%'
               }}/>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;