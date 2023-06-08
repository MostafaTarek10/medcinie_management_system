import React, { useState, useEffect } from "react";
import "../../Style/MedDetails.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { getAuthUser } from "../../helper/Storage";
import Table from "react-bootstrap/Table";

const MedDetails = () => {
  let { id } = useParams();
  const Auth = getAuthUser();
  const [Medicine, setMedicine] = useState({
    loading: true,
    result: null,
    err: null,
    reload: 0,
  });
  useEffect(() => {
    setMedicine({ ...Medicine, loading: true });
    axios
      .get("http://localhost:4000/admin/listMed/" + id)
      .then((resp) => {
        setMedicine({
          ...Medicine,
          result: resp.data,
          loading: false,
          err: null,
        });
      })
      .catch((err) => {
        setMedicine({
          ...Medicine,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, []);

  //Start REQUEST FOR A MEDICINE
  const [request, setRequest] = useState({
    err: "",
    success: "",
    loading: false,
    success: null,
    Medicine_id: "",
  });

  const requestMedicine = (id) => {
    axios
      .post(
        "http://localhost:4000/patient/request",
        {
          meds_id: id,
        },
        {
          headers: {
            tokens: Auth.tokens,
          },
        }
      )
      .then((resp) => {
        setRequest({
          ...request,
          err: null,
          loading: true,
          success: "Requested Successfully !",
        });
      })
      .catch((err) => {
        setRequest({
          ...request,
          loading: true,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };
  //End REQUEST FOR A MEDICINE

  return (
    <div className="color">
      <div className="Med-Details-container p-5 ">
        <h1 className="Medicine-Details">Medicine Details</h1>
        {Medicine.loading === true && (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {Medicine.loading === false && Medicine.err == null && (
          <>
            <div className="bg-black p-5 m-5 ">
              {" "}
              <div className="row text-light">
                <h3> Medicine Name: {Medicine.result[0].name} </h3>
                <p className="Details">{Medicine.result[0].description}</p>
                <p className="Price">Price: {Medicine.result[0].price}</p>
                {/* <button className="Buy">Buy Now</button> */}
                <p>expirationDate: {Medicine.result[0].expirationDate}</p>
              </div>
            </div>

            <button
              className="btn btn-dark ms-2"
              variant="primary"
              disabled={request.loading === true}
              onClick={(e) => {
                requestMedicine(id);
              }}
            >
              Request Medicine
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MedDetails;
