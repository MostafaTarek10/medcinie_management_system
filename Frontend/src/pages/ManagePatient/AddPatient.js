import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";

const AddPatient = () => {
  const auth = getAuthUser();
  const [patient, setPatient] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    err: "",
    loading: false,
    success: null,
  });

  // const image = useRef(null);

  const createpatient = (e) => {
    e.preventDefault();

    setPatient({ ...patient, loading: true });

    axios
      .post("http://localhost:4000/admin/createPatient", {
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        password: patient.password,
      })
      .then((resp) => {
        setPatient({
          name: "",
          phone: "",
          email: "",
          password: "",
          err: null,
          loading: false,
          success: "patient Created Successfully !",
        });
        // image.current.value = null;
      })
      .catch((err) => {
        setPatient({
          ...patient,
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
        <h1>Add New patient Form</h1>

        {patient.err && (
          <Alert variant="danger" className="p-2">
            {patient.err}
          </Alert>
        )}

        {patient.success && (
          <Alert variant="success" className="p-2">
            {patient.success}
          </Alert>
        )}

        <Form onSubmit={createpatient}>
          <Form.Group className="mb-3">
            <Form.Control
              value={patient.name}
              onChange={(e) => setPatient({ ...patient, name: e.target.value })}
              type="text"
              required
              placeholder="patient Name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              value={patient.phone}
              onChange={(e) =>
                setPatient({ ...patient, phone: e.target.value })
              }
              type="text"
              required
              placeholder="Phone Number"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              value={patient.password}
              onChange={(e) =>
                setPatient({ ...patient, password: e.target.value })
              }
              type="password"
              required
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <textarea
              className="form-control"
              placeholder="Email"
              value={patient.email}
              required
              onChange={(e) =>
                setPatient({ ...patient, email: e.target.value })
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
            Add New patient
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddPatient;
