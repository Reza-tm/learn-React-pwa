import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CustomeCard from "../../components/Layout/Card/CustomeCard";
import reactPic from "../../assets/images/react-v1.png";
import pwaPic from "../../assets/images/pwa.png";
import jsPic from "../../assets/images/js.jpeg";

const AppPage = () => {
  const [isDataComing, setIsDataComing] = useState([]);
  let isNetResived = false;
  useEffect(() => {
    if ("caches" in window) {
      caches
        .match("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          console.log("cache done ");
          return res.json();
        })
        .then((data) => {
          if (!isDataComing) {
            setIsDataComing(data);
          }
        })
        .then((log) => console.log("from cache"));
    }
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((netData) => {
        isNetResived = true;
        setIsDataComing(netData);
      })
      .then((log) => console.log("form net new"));
  }, []);

  return isDataComing.length > 0 ? (
    <Row lg={3} md={2} xs={1}>
      {isDataComing.map((item, index) => (
        <Col style={{ padding: "10px auto" }}>
          <CustomeCard text="React is best library for JS" title="React js" pic={reactPic} />
        </Col>
      ))}
    </Row>
  ) : (
    ""
  );
};

export default AppPage;
