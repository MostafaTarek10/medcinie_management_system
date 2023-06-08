// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Alert from 'react-bootstrap/Alert';

// const AddCategories = () => {
//     return (
//         <div>
//     <Form className="login-container">
//         <h1>Add New Categorie</h1>

//         <Alert variant={"danger"} className="p-2" >
//             This is a alert—check it out!
//         </Alert>
//         <Alert variant={"success"} className="p-2" >
//             This is a alert—check it out!
//         </Alert>

//     <Form.Group className="mb-3" >
//         <Form.Control type="text" placeholder="Categorie Name" />
//     </Form.Group>

//     <Form.Group className="mb-3">
//         <textarea className='form-control' placeholder='Description'
//         rows={5}>
//         </textarea>
//     </Form.Group>

//     <Form.Group className="mb-3">
//         <input type='file' className='form-control'/>
//     </Form.Group>

//     <Button variant="primary" type="submit">
//         Add New Categorie
//     </Button>
//     </Form>
// </div>
//     );
// };

// export default AddCategories;

import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";

const AddCategories = () => {
  const auth = getAuthUser();
  const [category, setcategorys] = useState({
    name: "",
    description: "",
    err: "",
    loading: false,
    success: null,
  });

  // const image = useRef(null);

  const createcategory = (e) => {
    e.preventDefault();

    setcategorys({ ...category, loading: true });

    axios
      .post("http://localhost:4000/admin/createCat", {
        name: category.name,
        description: category.description,
      })
      .then((resp) => {
        setcategorys({
          name: "",
          description: "",
          err: null,
          loading: false,
          success: "category Created Successfully !",
        });
        // image.current.value = null;
      })
      .catch((err) => {
        setcategorys({
          ...category,
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
        <h1>Add New category Form</h1>

        {category.err && (
          <Alert variant="danger" className="p-2">
            {category.err}
          </Alert>
        )}

        {category.success && (
          <Alert variant="success" className="p-2">
            {category.success}
          </Alert>
        )}

        <Form onSubmit={createcategory}>
          <Form.Group className="mb-3">
            <Form.Control
              value={category.name}
              onChange={(e) =>
                setcategorys({ ...category, name: e.target.value })
              }
              type="text"
              required
              placeholder="category Name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <textarea
              className="form-control"
              placeholder="Description"
              value={category.description}
              required
              onChange={(e) =>
                setcategorys({ ...category, description: e.target.value })
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
            Add New category
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddCategories;

// auto increment for id
