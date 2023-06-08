import React, { useState, useEffect } from "react";
import MedCat from "../../Components/MedCat";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

const CategoriesIntegration = () => {
  const [Categories, setCategories] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  useEffect(() => {
    setCategories({ ...Categories, loading: true });
    axios
      .get("http://localhost:4000/admin/listCategory/")
      .then((resp) => {
        console.log(resp);
        setCategories({
          ...Categories,
          results: resp.data,
          loading: false,
          err: null,
        });
      })

      .catch((err) => {
        setCategories({
          ...Categories,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [Categories.reload]);

  return (
    <div>
      {Categories.loading === false && Categories.err == null && (
        <>
          {/* Categories List */}
          <div>
            <div className="row">
              {Categories.results.map((Categories) => (
                <div
                  className="col-xs-6 col-sm-3 med-cat-container"
                  key={Categories.id}
                >
                  <MedCat
                    name={Categories.name}
                    description={Categories.description}
                  />
                </div>
              ))}
            </div>
          </div>
          {Categories.loading === false &&
            Categories.err == null &&
            Categories.results.length === 0 && (
              <Alert variant={"danger"}>
                There is No Categories with that name, Pleae come back later
              </Alert>
            )}
          {/*  CATEGORIES LIST */}

          {/* <div className="row">
            <div className="col-xs-6 col-sm-3 med-cat-container">
              <MedCat />
            </div>
            <div className="col-xs-6 col-sm-3 med-cat-container">
              <MedCat />
            </div>
            <div className="col-xs-6 col-sm-3 med-cat-container">
              <MedCat />
            </div>
            <div className="col-xs-6 col-sm-3 med-cat-container">
              <MedCat />
            </div>
          </div> */}
        </>
      )}
      ;
    </div>
  );

  // =============================================
};

export default CategoriesIntegration;
