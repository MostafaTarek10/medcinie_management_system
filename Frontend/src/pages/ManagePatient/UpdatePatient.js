import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdatePatient = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [patient, setPatient] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    err: "",
    loading: false,
    reload: false,
    success: null,
  });

  const updatePatient = (e) => {
    e.preventDefault();

    setPatient({ ...patient, loading: true });

    axios
      .put("http://localhost:4000/admin/updatePatient/" + id, {
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        password: patient.password,
      })
      .then((resp) => {
        setPatient({
          ...patient,
          name: "",
          phone: "",
          email: "",
          password: "",
          loading: false,
          success: "patient updated successfully !",
          reload: patient.reload + 1,
        });
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
        <h1>Update patient</h1>

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

        <Form onSubmit={updatePatient}>
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
              type="number"
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
            <Form.Control
              value={patient.email}
              onChange={(e) =>
                setPatient({ ...patient, email: e.target.value })
              }
              type="text"
              required
              placeholder="Email"
            />
          </Form.Group>
          <Button
            className="btn btn-dark w-100"
            variant="primary"
            type="submit"
          >
            Update patient
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePatient;
