import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { setAuthUser } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    email: "",
    password: "",
    name: "",
    loading: false,
    err: [],
  });

  const RegisterFun = (e) => {
    e.preventDefault();
    setRegister({ ...register, loading: true, err: [] });
    axios
      .post("http://localhost:4000/auth/register", {
        email: register.email,
        password: register.password,
        name: register.name,
      })
      .then((resp) => {
        setRegister({ ...register, loading: false, err: [] });
        setAuthUser(resp.data);
        navigate("/");
      })
      .catch((errors) => {
        console.log(errors);
        setRegister({
          ...register,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };
  return (
    <div className="color">
      {" "}
      <div className="login-container">
        <h1>Register Form</h1>
        {register.err.map((error, index) => (
          <Alert key={index} variant={"danger"}>
            {" "}
            {error.msg}{" "}
          </Alert>
        ))}

        <Form onSubmit={RegisterFun}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Please Enter Your Name"
              value={register.name}
              onChange={(e) =>
                setRegister({ ...register, name: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Please Enter Your Email"
              value={register.email}
              onChange={(e) =>
                setRegister({ ...register, email: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Please Enter Your Password"
              value={register.password}
              onChange={(e) =>
                setRegister({ ...register, password: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Please Enter Your Phone-Number"
              value={register.number}
              onChange={(e) =>
                setRegister({ ...register, number: e.target.value })
              }
              required
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={register.loading === true}
          >
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
