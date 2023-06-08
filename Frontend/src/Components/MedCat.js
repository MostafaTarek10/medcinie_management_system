import React from "react";
import Card from "react-bootstrap/Card";
// import ListGroup from "react-bootstrap/ListGroup";
import "../Style/MedCat.css";
import { Link } from "react-router-dom";

const MedCat = (props) => {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Name: {props.name} </Card.Title>
        </Card.Body>
        <Card.Body>
          <Card.Text>{props.description}</Card.Text>
          {/* <Link to={"/" + props.id} className="Card">
            Show More
          </Link> */}
          {/* <Link to={'/ManageMedicines'} className='Card'>Show More</Link> */}
        </Card.Body>
      </Card>
    </div>
  );
};
export default MedCat;
