import React, { useState, useEffect } from "react";
import "../../Style/MedDetails.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { getAuthUser } from "../../helper/Storage";

const PatientDetails = () => {
  let { id } = useParams();
  const Auth = getAuthUser();
  const [patient, setPatient] = useState({
    loading: true,
    result: null,
    err: null,
    reload: 0,
  });
  useEffect(() => {
    setPatient({ ...patient, loading: true });
    axios
      .get("http://localhost:4000/admin/listPatient/" + id)
      .then((resp) => {
        setPatient({
          ...patient,
          result: resp.data,
          loading: false,
          err: null,
        });
      })
      .catch((err) => {
        setPatient({
          ...patient,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, []);

  //Start REQUEST FOR A patient
  const [request, setRequest] = useState({
    err: "",
    success: "",
    loading: false,
    success: null,
    patient_id: "",
  });

  const requestpatient = (id) => {
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
  //End REQUEST FOR A patient

  return (
    <div className="Med-Details-container p-5">
      <h1 className="patient-Details">patient Details</h1>
      {patient.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {patient.loading === false && patient.err == null && (
        <>
          <div className="row">
            <h3> {patient.result[0].name} </h3>
            <p className="Details">{patient.result[0].description}</p>
            <p className="Price">Price: {patient.result[0].price}</p>
            {/* <button className="Buy">Buy Now</button> */}
            <p>expirationDate: {patient.result[0].expirationDate}</p>
          </div>
          <button
            className="btn btn-dark ms-2"
            variant="primary"
            disabled={request.loading === true}
            onClick={(e) => {
              requestpatient(id);
            }}
          >
            Request Book
          </button>
        </>
      )}
    </div>
  );
};

export default PatientDetails;
