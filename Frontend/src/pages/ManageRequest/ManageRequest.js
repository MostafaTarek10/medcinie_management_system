import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import "../../Style/ManageRequest.css";
import { getAuthUser } from "../../helper/Storage";

const ManageRequest = () => {
  const Auth = getAuthUser();

  const [requests, setRequests] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setRequests({ ...requests, loading: true });
    axios
      .get("http://localhost:4000/admin/listRequests/pending", {
        // headers: {
        //   tokens: Auth.tokens,
        // },
      })
      .then((resp) => {
        console.log(resp);
        setRequests({
          ...requests,
          results: resp.data,
          loading: false,
          err: null,
        });
      })
      .catch((err) => {
        setRequests({
          ...requests,
          loading: false,
          err: "something went wrong , please try again later!",
        });
      });
  }, [requests.reload]);

  const acceptRequest = (id) => {
    axios
      .put("http://localhost:4000/admin/acceptRequest/" + id, {
        // headers: {
        //   tokens: Auth.tokens,
        // },
      })
      .then((resp) => {
        setRequests({ ...requests, reload: requests.reload + 1 });
      })
      .catch((err) => {
        setRequests({
          ...requests,
          loading: false,
          err: "something went wrong , please try again later!",
        });
      });
  };
  const declineRequest = (id) => {
    axios
      .put("http://localhost:4000/admin/declineRequest/" + id, {
        // headers: {
        //   tokens: Auth.tokens,
        // },
      })
      .then((resp) => {
        setRequests({ ...requests, reload: requests.reload + 1 });
      })
      .catch((err) => {
        setRequests({
          ...requests,
          loading: false,
          err: "something went wrong , please try again later!",
        });
      });
  };
  return (
    <div className="color">
      <div className="manage-medicines p-5">
        <div className="header-table mb-4">
          <h3 className="text-center">View Requests</h3>
        </div>

        {requests.loading === false &&
          requests.err == null &&
          requests.results.length === 0 && (
            <Alert variant="info" className="p-1">
              No Requests Yet!
            </Alert>
          )}

        {requests.loading === false && requests.err != null && (
          <Alert variant="danger" className="p-1">
            Error, please try again later
          </Alert>
        )}

        <Table striped bordered hover size="sm" variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>User-ID</th>
              <th>Mediine-ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.results.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.user_id}</td>
                <td>{request.medicines_id}</td>
                <td>
                  <button
                    className="btn btn-sm mx-2 btn-success"
                    onClick={(e) => {
                      acceptRequest(request.id);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      declineRequest(request.id);
                    }}
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ManageRequest;
