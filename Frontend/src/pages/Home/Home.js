import React, { useState, useEffect } from "react";
import "../Home/Home.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import MedicineList from "../../Components/MedicineList";
import Alert from "react-bootstrap/Alert";
import "../Home/CategoriesIntegration";
import CategoriesIntegration from "../Home/CategoriesIntegration";
import { getAuthUser } from "../../helper/Storage";
const Home = () => {
  const Auth = getAuthUser();
  const [Medicine, setMedicines] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    setMedicines({ ...Medicine, loading: true });
    axios
      .get("http://localhost:4000/patient/search/ " + Auth.id, {
        params: {
          search: search,
        },
      })
      .then((resp) => {
        console.log(resp);
        setMedicines({
          ...Medicine,
          results: resp.data,
          loading: false,
          err: null,
        });
      })

      .catch((err) => {
        setMedicines({
          ...Medicine,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [Medicine.reload]);

  const searchMedicines = (e) => {
    e.preventDefault();
    setMedicines({ ...Medicine, reload: Medicine.reload + 1 });

    // =============================================
  };

  return (
    <div className="color">
      <div className="home-container  ">
        {/* FOR SOME PARAGRAPHS */}
        <div className="text">
          <h1> Medicines Website</h1>
        </div>
        {/* For LAYOUT */}
        <div className="landing">
          <div className="intro-text">
            <h1>Hello There</h1>
            <p>
              This is our Website for Medicines, You Can buy your Medicines from
              here
            </p>
            <p>
              In Our Website we are going to show you our medicines, our Manage
              on this page
            </p>
          </div>
        </div>
        {/* For LAYOUT */}
        {/* Loader  */}
        {Medicine.loading === true && (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {/* FOR SEARCH */}
        {Medicine.loading === false && Medicine.err == null && (
          <>
            <Form onSubmit={searchMedicines}>
              <Form.Group className="frm-group">
                <Form.Control
                  type="text"
                  placeholder="What are you looking for?"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="Search">Search</button>
              </Form.Group>
            </Form>
            {/* Medicine List */}
            <div className="color">
              {" "}
              <div className="MedList">
                <h1 style={{ fontWeight: "bold" }}>Medicine List</h1>
                <div className="row">
                  {Medicine.results.map((Medicine) => (
                    <div
                      className="col-xs-6 col-sm-3 med-cat-container"
                      key={Medicine.id}
                    >
                      <MedicineList
                        name={Medicine.name}
                        description={Medicine.description}
                        price={Medicine.price}
                        expirationDate={Medicine.expirationDate}
                        id={Medicine.id}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {Medicine.loading === false &&
              Medicine.err == null &&
              Medicine.results.length === 0 && (
                <Alert variant={"danger"}>
                  There is No Medicine with that name, Pleae come back later
                </Alert>
              )}
            {/*  CATEGORIES LIST */}
            <h1 style={{ fontWeight: "bold" }}>Medicine Categories :-</h1>
            <div className="color m-2 p-5">
              <CategoriesIntegration />
            </div>
          </>
        )}

        {/* CONTACT */}
        <div className="contact">
          <div className="main-heading">
            <h2>Contact Us</h2>
            <p>
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
              Mauris blandit aliquet elit, eget tincidunt.
            </p>
          </div>
          <div className="content">
            <form action="">
              <input
                className="main-input"
                type="text"
                name="name"
                placeholder="Your Name"
              />
              <input
                className="main-input"
                type="email"
                name="mail"
                placeholder="Your Email"
              />
              <textarea
                className="main-input"
                name="message"
                placeholder="Your Message"
              ></textarea>
              <input type="submit" value="Send Message" />
            </form>
            <div className="info">
              <h4>Get In Touch</h4>
              <span className="phone">+00 123.456.789</span>
              <span className="phone">+00 123.456.789</span>
              <h4>Where We Are</h4>
              <address>
                Awesome Address 17
                <br />
                New York, NYC
                <br />
                123-4567-890
                <br />
                USA
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
