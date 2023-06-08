// import React from "react";
// import "../../Style/ManageCategories.css";
// import Table from "react-bootstrap/Table";
// import { Link } from "react-router-dom";
// import Alert from "react-bootstrap/Alert";
// const ManageCategories = () => {
//   return (
//     <div className="manage-cat">
//       <div className="header">
//         <h3>Manage Categories</h3>
//         <Link to={"add"} className="btn btn-success">
//           Add New Categorie
//         </Link>
//       </div>

//       <Alert variant={"danger"} className="p-2">
//         This is a alert—check it out!
//       </Alert>
//       <Alert variant={"success"} className="p-2">
//         This is a alert—check it out!
//       </Alert>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Image</th>
//             <th>Categorie Name</th>
//             <th>Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>1</td>
//             <td>
//               <img
//                 src="https://picsum.photos/200/300"
//                 alt=""
//                 className="Categories-img"
//               />
//             </td>
//             <td>Heart Issues</td>
//             <td>
//               {" "}
//               Some quick example text to build on the card title and make{" "}
//             </td>
//             <td>
//               <Link className="btn btn-sm btn-danger">Delete</Link>
//               <Link to={"Update"} className="btn btn-sm btn-primary mx-5">
//                 Update
//               </Link>
//               <Link to={"show"} className="btn btn-sm btn-info">
//                 Show
//               </Link>
//             </td>
//           </tr>
//         </tbody>
//         <tbody>
//           <tr>
//             <td>1</td>
//             <td>
//               <img
//                 src="https://picsum.photos/200/300"
//                 alt=""
//                 className="Categories-img"
//               />
//             </td>
//             <td>Heart Issues</td>
//             <td>
//               {" "}
//               Some quick example text to build on the card title and make{" "}
//             </td>
//             <td>
//               <Link className="btn btn-sm btn-danger">Delete</Link>
//               <Link to={"Update"} className="btn btn-sm btn-primary mx-5">
//                 Update
//               </Link>
//               <Link to={"/MedDetails"} className="btn btn-sm btn-info">
//                 Show
//               </Link>
//             </td>
//           </tr>
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default ManageCategories;

import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const ManageCategory = () => {
  const auth = getAuthUser();
  const [category, setcategory] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setcategory({ ...category, loading: true });
    axios
      .get("http://localhost:4000/admin/listcategory")
      .then((resp) => {
        // console.log(resp);
        setcategory({
          ...category,
          results: resp.data,
          loading: false,
          err: null,
        });
      })

      .catch((err) => {
        setcategory({
          ...category,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [category.reload]);

  const deletecategory = (id) => {
    axios
      .delete("http://localhost:4000/admin/deletcategory/" + id)
      .then((resp) => {
        setcategory({ ...category, reload: category.reload + 1 });
      })
      .catch((err) => {});
  };
  return (
    <div className="color">
      {" "}
      <div className="manage-category p-5">
        <div className="header d-flex justify-content-between mb-5">
          <h3 className="text-center ">Manage category</h3>
          <Link to={"add"} className="btn btn-success">
            +Add New category
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
              {/* <th>#</th> */}
              <th>category name</th>
              <th>category id</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {category.results.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.id}</td>
                <td> {category.description}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      deletecategory(category.id);
                    }}
                  >
                    Delete
                  </button>
                  <Link
                    to={"" + category.id}
                    className="btn btn-sm btn-primary mx-2"
                  >
                    Update
                  </Link>
                  {/* <Link to={"/" + category.id} className="btn btn-sm btn-info">
                show
              </Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ManageCategory;
