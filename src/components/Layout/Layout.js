import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Layout.scss";

const Layout = ({ children }) => {
  const location = useLocation().pathname;

  const notificationPermission = () => {
    Notification.requestPermission((result) => {
      console.log(result);
    });
    const option = {
      body: "Wellcome to PWA Notification Club !",
      icon: "/android/android-launchericon-96-96.png",
    };
    try {
      new Notification("Reza sobhgol", option);
      console.log("ok");
    } catch (error) {
      console.log(error);
    }
  };

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
      <div
        onClick={() => notificationPermission()}
        style={{
          position: "fixed",
          right: 30,
          bottom: 20,
          backgroundColor: "#06b6d4",
          height: "50px",
          width: "50px",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "25px",
          overflow: "hidden",
          display: window.Notification ? "flex" : "none",
        }}
      >
        <IoNotificationsOutline size={35} color="white" />
      </div>
    </div>
  );
};

export default Layout;
