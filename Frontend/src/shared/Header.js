import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../Style/Header.css";
import { removeAuthUser, getAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuthUser();
  const Logout = () => {
    removeAuthUser();
    navigate("/");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand></Navbar.Brand>
          <Nav className="me-auto">
            {/* <Link className="nav-link" to={"/"}>
              List Movies
            </Link> */}

            {/* unAuthenticated Route  */}
            {!auth && (
              <>
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
                <Link className="nav-link" to={"/register"}>
                  Register
                </Link>
              </>
            )}

            {/* Admin Routes  */}

            {auth && auth.type === 1 && (
              <>
                <Link className="nav-link" to={"/home"}>
                  Medicine App
                </Link>
                <Link to={"/Manage-Cat"} className="nav-link">
                  ManageCategories
                </Link>
                <Link to={"/manage-medicine"} className="nav-link">
                  Manage Medicine
                </Link>
                <Link to={"/Manage-Patient"} className="nav-link">
                  Manage Patient
                </Link>
                <Link to={"/Manage-Request"} className="nav-link">
                  Manage Request
                </Link>
              </>
            )}
            {auth && auth.type === 0 && (
              <>
                <Link className="nav-link" to={"/home"}>
                  Medicine App
                </Link>{" "}
                <Link className="nav-link" to={"/search-history"}>
                  Search History
                </Link>{" "}
              </>
            )}
          </Nav>

          <Nav className="ms-auto">
            {/* Authenticated Routes  */}
            {auth && <Nav.Link onClick={Logout}>Log out</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

// ==========================================
// import React from "react";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { Link } from "react-router-dom";
// import "../Style/Header.css";

// const Header = () => {
//   let Logout = () => {
//     <div>Logout</div>;
//   };
//   return (
//     <>
//       <Navbar bg="dark" variant="dark">
//         <Container>
//           <Navbar.Brand>
//             <Link to={"/"} className="nav-link">
//               Medicine categorize
//             </Link>
//           </Navbar.Brand>
//           <Nav className="me-auto">
//             {/* <Link to={"/"} className="nav-link">
//               Medicine list
//             </Link> */}
//             <Link to={"/login"} className="nav-link">
//               Login
//             </Link>
//             <Link to={"/register"} className="nav-link">
//               Register
//             </Link>
//             <Link to={"/Manage-Cat"} className="nav-link">
//               ManageCategories
//             </Link>
//             <Link to={"/manage-medicine"} className="nav-link">
//               Manage Medicine
//             </Link>
//             <Link to={"/Manage-Patient"} className="nav-link">
//               Manage Patient
//             </Link>
//           </Nav>
//           <Nav className="logout">
//             <Nav.Link onClick={Logout}>Logout</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>
//     </>
//   );
// };

// export default Header;
