import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const ManagePatient = () => {
  const auth = getAuthUser();
  const [Patient, setPatient] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setPatient({ ...Patient, loading: true });
    axios
      .get("http://localhost:4000/admin/listPatient")
      .then((resp) => {
        // console.log(resp);
        setPatient({
          ...Patient,
          results: resp.data,
          loading: false,
          err: null,
        });
      })

      .catch((err) => {
        setPatient({
          ...Patient,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [Patient.reload]);

  const deletePatient = (id) => {
    axios
      .delete("http://localhost:4000/admin/deletePatient/" + id)
      .then((resp) => {
        setPatient({ ...Patient, reload: Patient.reload + 1 });
      })
      .catch((err) => {});
  };
  return (
    <div className="color">
      <div className="manage-medicine p-5">
        <div className="header d-flex justify-content-between mb-5">
          <h3 className="text-center ">Manage Patient</h3>
          <Link to={"add"} className="btn btn-success">
            +Add New Patient
          </Link>
        </div>

        {/* <Alert variant="danger" className="p-2">
        This is simple Alert
      </Alert>
      <Alert variant="success" className="p-2">
        This is simple Alert
      </Alert> */}

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th> Patient Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Patient.results.map((Patient) => (
              <tr key={Patient.id}>
                <td>{Patient.id}</td>
                <td>{Patient.name}</td>
                <td> {Patient.phone}</td>
                <td> {Patient.email}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      deletePatient(Patient.id);
                    }}
                  >
                    Delete
                  </button>
                  <Link
                    to={"" + Patient.id}
                    className="btn btn-sm btn-primary mx-2"
                  >
                    Update
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ManagePatient;
