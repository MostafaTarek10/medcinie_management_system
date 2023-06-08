import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";

const AddMedicine = () => {
  const auth = getAuthUser();
  const [medicine, setMedicines] = useState({
    name: "",
    description: "",
    price: "",
    expirationDate: "",
    categoryId: "",
    err: "",
    loading: false,
    success: null,
  });

  // const image = useRef(null);

  const createMedicine = (e) => {
    e.preventDefault();

    setMedicines({ ...medicine, loading: true });

    axios
      .post("http://localhost:4000/admin/createMed", {
        name: medicine.name,
        description: medicine.description,
        price: medicine.price,
        expirationDate: medicine.expirationDate,
        categoryId: medicine.categoryId,
      })
      .then((resp) => {
        setMedicines({
          name: "",
          description: "",
          price: "",
          expirationDate: "",
          categoryId: "",
          err: null,
          loading: false,
          success: "medicine Created Successfully !",
        });
        // image.current.value = null;
      })
      .catch((err) => {
        setMedicines({
          ...medicine,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  return (
    <div className="color">
      {" "}
      <div className="login-container">
        <h1>Add New medicine Form</h1>

        {medicine.err && (
          <Alert variant="danger" className="p-2">
            {medicine.err}
          </Alert>
        )}

        {medicine.success && (
          <Alert variant="success" className="p-2">
            {medicine.success}
          </Alert>
        )}

        <Form onSubmit={createMedicine}>
          <Form.Group className="mb-3">
            <Form.Control
              value={medicine.name}
              onChange={(e) =>
                setMedicines({ ...medicine, name: e.target.value })
              }
              type="text"
              required
              placeholder="medicine Name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              value={medicine.categoryId}
              onChange={(e) =>
                setMedicines({ ...medicine, categoryId: e.target.value })
              }
              type="text"
              required
              placeholder="categoryId"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              value={medicine.price}
              onChange={(e) =>
                setMedicines({ ...medicine, price: e.target.value })
              }
              type="text"
              required
              placeholder="medicine price"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              value={medicine.expirationDate}
              onChange={(e) =>
                setMedicines({ ...medicine, expirationDate: e.target.value })
              }
              type="text"
              required
              placeholder="medicine expirationDate"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <textarea
              className="form-control"
              placeholder="Description"
              value={medicine.description}
              required
              onChange={(e) =>
                setMedicines({ ...medicine, description: e.target.value })
              }
              rows={5}
            ></textarea>
          </Form.Group>

          {/* <Form.Group className="mb-3">
        <input type="file" className="form-control" ref={image} required />
      </Form.Group> */}

          <Button
            className="btn btn-dark w-100"
            variant="primary"
            type="submit"
          >
            Add New medicine
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddMedicine;
