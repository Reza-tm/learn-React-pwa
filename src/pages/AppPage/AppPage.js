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
        .match("https://react-pwa-350e2-default-rtdb.europe-west1.firebasedatabase.app/Posts.json")
        .then((res) => {
          console.log("cache done ");
          return res.json();
        })
        .then((data) => {
          const array = [];
          for (let key in data) {
            array.push(data[key]);
          }
          setIsDataComing(array);
        })
        .then((log) => console.log("from cache"));
    }
    fetch("https://react-pwa-350e2-default-rtdb.europe-west1.firebasedatabase.app/Posts.json")
      .then((res) => res.json())
      .then((netData) => {
        const array = [];
        for (let key in netData) {
          array.push(netData[key]);
        }
        isNetResived = true;
        setIsDataComing(array);
      })
      .then((log) => console.log("form net new"));
  }, []);

  return isDataComing.length > 0 ? (
    <Row lg={3} md={2} xs={1}>
      {isDataComing.map((item, index) => (
        <Col style={{ padding: "10px auto" }}>
          <CustomeCard text={item.Text} title={item.Title} pic={item.Image} />
        </Col>
      ))}
    </Row>
  ) : (
    ""
  );
};

export default AppPage;
