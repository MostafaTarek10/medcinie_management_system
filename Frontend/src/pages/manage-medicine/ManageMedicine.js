import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const ManageMedicine = () => {
  const auth = getAuthUser();
  const [medicines, setMedicines] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setMedicines({ ...medicines, loading: true });
    axios
      .get("http://localhost:4000/admin/search")
      .then((resp) => {
        // console.log(resp);
        setMedicines({
          ...medicines,
          results: resp.data,
          loading: false,
          err: null,
        });
      })

      .catch((err) => {
        setMedicines({
          ...medicines,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [medicines.reload]);

  const deleteMedicines = (id) => {
    axios
      .delete("http://localhost:4000/admin/delete/" + id)
      .then((resp) => {
        setMedicines({ ...medicines, reload: medicines.reload + 1 });
      })
      .catch((err) => {});
  };
  return (
    <div className="color">
      {" "}
      <div className="manage-medicine p-5">
        <div className="header d-flex justify-content-between mb-5">
          <h3 className="text-center ">Manage Medicine</h3>
          <Link to={"add"} className="btn btn-success">
            +Add New Medicine
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
              <th>#</th>
              <th>Category</th>
              <th>Medicine name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.results.map((medicines) => (
              <tr key={medicines.id}>
                <td>{medicines.id}</td>
                <td>{medicines.categoryId}</td>
                <td>{medicines.name}</td>
                <td> {medicines.description}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      deleteMedicines(medicines.id);
                    }}
                  >
                    Delete
                  </button>
                  <Link
                    to={"" + medicines.id}
                    className="btn btn-sm btn-primary mx-2"
                  >
                    Update
                  </Link>
                  <Link to={"/" + medicines.id} className="btn btn-sm btn-info">
                    show
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

export default ManageMedicine;
