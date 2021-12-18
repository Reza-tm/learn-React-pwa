import React from "react";
import { Col, Row } from "react-bootstrap";
import CustomeCard from "../../components/Layout/Card/CustomeCard";
import reactPic from "../../assets/images/react-v1.png";
import pwaPic from "../../assets/images/pwa.png";
import jsPic from "../../assets/images/js.jpeg";

const AppPage = () => {
  return (
    <Row>
      <Col xs={12} md={6} lg={4} style={{ padding: "10px auto" }}>
        <CustomeCard text="React is best library for JS" title="React js" pic={reactPic} />
      </Col>
      <Col xs={12} md={6} lg={4} style={{ padding: "10px auto" }}>
        <CustomeCard text="PWA is future of Web development" title="PWA" pic={pwaPic} />
      </Col>
      <Col xs={12} md={6} lg={4} style={{ padding: "10px auto" }}>
        <CustomeCard text="JavaScript is father of the World" title="JavaScript" pic={jsPic} />
      </Col>
    </Row>
  );
};

export default AppPage;
