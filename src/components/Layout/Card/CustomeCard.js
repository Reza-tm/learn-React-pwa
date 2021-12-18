import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";

const CustomeCard = ({ text, pic, title }) => {
  return (
    <Card>
      <Card.Img style={{ borderRadius: "0", objectFit: "cover" }} height={300} variant="top" src={pic} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CustomeCard;
