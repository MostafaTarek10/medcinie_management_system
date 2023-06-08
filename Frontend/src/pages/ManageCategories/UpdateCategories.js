// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Alert from 'react-bootstrap/Alert';

// const UpdateCategories = () => {
//     return (
//         <div>
//     <Form className="login-container">
//         <h1>Update Categorie </h1>

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
//     Update Categorie
//     </Button>
//     </Form>
// </div>
//     );
// };

// export default UpdateCategories;

import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const UpdateCategory = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const auth = getAuthUser();
  const [categorie, setCategorie] = useState({
    name: "",
    description: "",
    err: "",
    loading: false,
    reload: false,
    success: null,
  });

  const updatecategorie = (e) => {
    e.preventDefault();

    setCategorie({ ...categorie, loading: true });

    axios
      .put("http://localhost:4000/admin/updateCategory/" + id, {
        name: categorie.name,
        description: categorie.description,
      })
      .then((resp) => {
        setCategorie({
          ...categorie,
          loading: false,
          success: "categorie updated successfully !",
          reload: categorie.reload + 1,
        });
      }, navigate("/Manage-Cat"))
      .catch((err) => {
        setCategorie({
          ...categorie,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/listCategory/" + id)
      .then((resp) => {
        setCategorie({
          ...categorie,
          name: resp.data.name,
          description: resp.data.description,
        });
      })
      .catch((err) => {
        setCategorie({
          ...categorie,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  }, [categorie.reload]);

  return (
    <div className="color">
      {" "}
      <div className="login-container">
        <h1>Update categorie Form</h1>

        {/* {categorie.err && (
      <Alert variant="danger" className="p-2">
        {categorie.err}
      </Alert>
    )} */}

        {categorie.success && (
          <Alert variant="success" className="p-2">
            {categorie.success}
          </Alert>
        )}

        <Form onSubmit={updatecategorie} className="text-center py-2">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="categorie Name"
              value={categorie.name}
              onChange={(e) =>
                setCategorie({ ...categorie, name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <textarea
              className="form-control"
              placeholder="Description"
              value={categorie.description}
              onChange={(e) =>
                setCategorie({ ...categorie, description: e.target.value })
              }
              rows={5}
            ></textarea>
          </Form.Group>
          <Button
            className="btn btn-dark w-100"
            variant="primary"
            type="submit"
            link
          >
            Update categorie
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateCategory;

// import React, { useState, useRef, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Alert from "react-bootstrap/Alert";
// import { getAuthUser } from "../../helper/Storage";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const UpdateCategories = () => {
//   let { id } = useParams();
//   const auth = getAuthUser();
//   const [Category, setCategory] = useState({
//     name: "",
//     description: "",
//     id: "",
//     err: "",
//     loading: false,
//     reload: false,
//     success: null,
//   });

//   const UpdateCategories = (e) => {
//     e.preventDefault();

//     setCategory({ ...Category, loading: true });

//     axios
//       .put("http://localhost:4000/admin/updateCategory/" + id, {
//         name: Category.name,
//         description: Category.description,
//         id : Category.id,
//       })
//       .then((resp) => {
//         setCategory({
//           ...Category,
//           loading: false,
//           success: "Category updated successfully !",
//           reload: Category.reload + 1,
//         });
//       })
//       .catch((err) => {
//         setCategory({
//           ...Category,
//           loading: false,
//           success: null,
//           err: "Something went wrong, please try again later !",
//         });
//       });
//   };

//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/admin/listCategory" + id)
//       .then((resp) => {
//         setCategory({
//           ...Category,
//           name: resp.data.name,
//           description: resp.data.description,
//           id: resp.data.id,
//         });
//       })
//       .catch((err) => {
//         setCategory({
//           ...Category,
//           loading: false,
//           success: null,
//           err: "Something went wrong, please try again later !",
//         });
//       });
//   }, [Category.reload]);

//   return (
//     <div className="login-container">
//       <h1>Update Category Form</h1>

//       {Category.err && (
//         <Alert variant="danger" className="p-2">
//           {Category.err}
//         </Alert>
//       )}

//       {Category.success && (
//         <Alert variant="success" className="p-2">
//           {Category.success}
//         </Alert>
//       )}

//       <Form onSubmit={UpdateCategories} className="text-center py-2">
//         <img
//           alt={Category.name}
//         //   style={{
//         //     width: "50%",
//         //     height: "200px",
//         //     objectFit: "cover",
//         //     borderRadius: "10px",
//         //     border: "1px solid #ddd",
//         //     marginBottom: "10px",
//         //   }}

//         />

//         <Form.Group className="mb-3">
//           <Form.Control
//             type="text"
//             placeholder="Category Name"
//             value={Category.name}
//             onChange={(e) => setCategory({ ...Category, name: e.target.value })}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <textarea
//             className="form-control"
//             placeholder="Description"
//             value={Category.description}
//             onChange={(e) =>
//               setCategory({ ...Category, description: e.target.value })
//             }
//             rows={5}></textarea>
//         </Form.Group>

//         <Button className="btn btn-dark w-100" variant="primary" type="submit">
//           Update Category
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default UpdateCategories;
