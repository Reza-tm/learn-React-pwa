import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CustomeCard from "../../components/Card/CustomeCard";
import { db } from "../../db";

const AppPage = () => {
  const [isDataComing, setIsDataComing] = useState([]);

  useEffect(() => {
    if ("caches" in window) {
      db.posts.toArray().then((res) => setIsDataComing(res));
    }
    fetch("https://react-pwa-350e2-default-rtdb.europe-west1.firebasedatabase.app/Posts.json")
      .then((res) => res.json())
      .then((netData) => {
        const array = [];
        for (let key in netData) {
          array.push(netData[key]);
        }
        setIsDataComing(array);
      });
  }, []);

  return isDataComing.length > 0 ? (
    <Row lg={3} md={2} xs={1}>
      {isDataComing.map((item, index) => (
        <Col key={index} style={{ padding: "10px auto" }}>
          <CustomeCard text={item.Text} title={item.Title} pic={item.Image} />
        </Col>
      ))}
    </Row>
  ) : (
    ""
  );
};

export default AppPage;
