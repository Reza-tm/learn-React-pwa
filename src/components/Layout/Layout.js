import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Layout.scss";

const Layout = ({ children }) => {
  const location = useLocation().pathname;

  return (
    <div>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container className="navbar">
          <header>
            <Nav defaultActiveKey={location == "/" ? "1" : location == "/add" ? "2" : "3"} variant="pills">
              <Link to="/">
                <Nav.Item>
                  <Nav.Link as="p" eventKey="1">
                    Home
                  </Nav.Link>
                </Nav.Item>
              </Link>
              <Link to="/add">
                <Nav.Item>
                  <Nav.Link as="p" eventKey="2">
                    Add
                  </Nav.Link>
                </Nav.Item>
              </Link>
            </Nav>
            <h1>React PWA</h1>
          </header>
        </Container>
      </Navbar>
      <Container style={{ padding: "20px 0" }}>{children}</Container>
    </div>
  );
};

export default Layout;
