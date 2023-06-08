import React, { useState, useEffect } from "react";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const HistoryPage = () => {
  const Auth = getAuthUser();
  // const [medicines, setMedicines] = useState({
  //   loading: true,
  //   results: [],
  //   err: null,
  //   reload: 0,
  // });

  const [search, setSearch] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  useEffect(() => {
    setSearch({ ...search, loading: true });
    axios
      .get("http://localhost:4000/patient/searchHistory/" + Auth.id, {
        headers: {
          tokens: Auth.tokens,
        },
      })
      .then((resp) => {
        setSearch({
          ...search,
          results: resp.data,
          loading: false,
          err: null,
        });
        console.log(resp);
      });
  }, []);
  // useEffect(() => {
  //   setMedicines({ ...medicines, loading: true });
  //   axios
  //     .get("http://localhost:4000/patient/search/" + Auth.id, {
  //       params: {
  //         search: search,
  //       },
  //       headers: {
  //         tokens: Auth.tokens,
  //       },
  //     })
  //     .then((resp) => {
  //       setMedicines({
  //         ...medicines,
  //         result: resp.data,
  //         loading: false,
  //         err: null,
  //       });
  //       console.log(resp);
  //     });
  // }, []);
  //   useEffect(()=>{
  //
  //     }).then(resp => {
  //       console.log(resp);
  //       setBooks({...books , results :resp.data ,loading : false , err : null })
  // })
  console.log(search.results.id);
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Table class="rounded" striped bordered hover variant="dark">
        <thead>
          <tr>
            <td colSpan={2}>
              <h4>{Auth.name} (Search History)</h4>
            </td>
          </tr>
        </thead>
        <thead>
          <tr>
            <td>Seach Name</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          {search.results.map((search, key) => (
            <tr key={key}>
              <td>{search.search}</td>
              <td>{search.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Search History</th>
          </tr>
        </thead>
        <tbody>
          {search.results.map((search) => (
            <tr key={search.resp.id}>
              <td>{search.resp.id}</td>
              <td>{search.resp.date}</td>
            </tr>
          ))}
        </tbody>
      </Table> */}
    </div>
  );
};

export default HistoryPage;
