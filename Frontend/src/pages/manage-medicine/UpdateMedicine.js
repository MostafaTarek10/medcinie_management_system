// import React from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Alert from "react-bootstrap/Alert";

// const UpdateMedicine = () => {
//   return (
//     <div className="login-container">
//       <h1>Update Medicine Form</h1>

//       <Alert variant="danger" className="p-2">
//         This is simple Alert
//       </Alert>
//       <Alert variant="success" className="p-2">
//         This is simple Alert
//       </Alert>
//       <Form>
//         <Form.Group className="mb-3">
//           <Form.Control type="text" placeholder="Medicine Name" />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <textarea
//             className="form-control"
//             placeholder="Description"
//             rows={5}
//           ></textarea>
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <input type="file" className="form-control" />
//         </Form.Group>

//         <Button className="btn btn-dark w-100" variant="primary" type="submit">
//           Update Medicine
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default UpdateMedicine;

import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateMedicine = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [medicine, setmedicine] = useState({
    name: "",
    description: "",
    price: "",
    expirationDate: "",
    categoryId: "",
    err: "",
    loading: false,
    reload: false,
    success: null,
  });

  const updatemedicine = (e) => {
    e.preventDefault();

    setmedicine({ ...medicine, loading: true });

    axios
      .put("http://localhost:4000/admin/update/" + id, {
        name: medicine.name,
        description: medicine.description,
        price: medicine.price,
        expirationDate: medicine.expirationDate,
        categoryId: medicine.categoryId,
      })
      .then((resp) => {
        setmedicine({
          ...medicine,
          name: "",
          description: "",
          price: "",
          expirationDate: "",
          categoryId: "",
          loading: false,
          success: "medicine updated successfully !",
          reload: medicine.reload + 1,
        });
      })
      .catch((err) => {
        setmedicine({
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
        <h1>Update medicine</h1>

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

        <Form onSubmit={updatemedicine}>
          <Form.Group className="mb-3">
            <Form.Control
              value={medicine.name}
              onChange={(e) =>
                setmedicine({ ...medicine, name: e.target.value })
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
                setmedicine({ ...medicine, categoryId: e.target.value })
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
                setmedicine({ ...medicine, price: e.target.value })
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
                setmedicine({ ...medicine, expirationDate: e.target.value })
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
                setmedicine({ ...medicine, description: e.target.value })
              }
              rows={5}
            ></textarea>
          </Form.Group>

          <Button
            className="btn btn-dark w-100"
            variant="primary"
            type="submit"
          >
            Update Medicine
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateMedicine;
