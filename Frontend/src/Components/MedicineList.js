import React from "react";
import Card from "react-bootstrap/Card";
import "../Style/MedList.css";
import { Link } from "react-router-dom";

const MedicineList = (props) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title className="title"> {props.name} </Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Link className="Another-Link" to={"/" + props.id}>
          Show Details
        </Link>
      </Card.Body>
    </Card>
  );
};

export default MedicineList;
