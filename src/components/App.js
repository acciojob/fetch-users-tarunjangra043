import React, { useEffect, useState } from "react";
import './../styles/App.css';
import Axios from "axios";
import 'regenerator-runtime/runtime';

const App = () => {
  const [apiData, setApiData] = useState([]);
  const [fetchOn, setFetchOn] = useState(false);
  const [dataGot, setDataGot] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await Axios.get('https://reqres.in/api/users');
      if (response.data.data.length === 0) {
        setError("No data found to display.");
      } else {
        setApiData(response.data.data);
        setDataGot(true);
        setError(null); 
      }
    } catch (error) {
      setError("No data found to display.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetchOn && !dataGot) {
      fetchData();
    }
  }, [fetchOn]);

  return (
    <div
      id="main"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "60%",
        margin: "auto",
        marginTop: "50px"
      }}
    >
      <nav
        id="header"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%"
        }}
      >
        <span
          id="title"
          style={{
            fontSize: "30px",
            fontWeight: "400"
          }}
        >
          Blue Whales
        </span>
        <button
          className="btn"
          style={{
            border: "none",
            padding: "10px",
            margin: "0",
            boxSizing: "border-box",
            width: "150px",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "15px"
          }}
          onClick={() => setFetchOn(true)}
        >
          Get User List
        </button>
      </nav>

      {loading && <h3>Loading...</h3>}

      {(
        <table id="table">
          <thead>
            <tr className="tr">
              <th className="th" id="firstName">First Name</th>
              <th className="th" id="lastName">Last Name</th>
              <th className="th" id="email">Email</th>
              <th className="th" id="avatar">Avatar</th>
            </tr>
          {!dataGot && <tr id="noData"><td colSpan="4"><h3>{ error || "No data found"}</h3></td></tr>}
          </thead>
          {dataGot && !loading && (<tbody id="tbody">
            {apiData.map((data) => (
              <tr className="tr" key={data.id}>
                <td className="td" id="firstName">{data.first_name}</td>
                <td className="td" id="lastName">{data.last_name}</td>
                <td className="td" id="email">{data.email}</td>
                <td className="td" id="avatar">
                  <img src={data.avatar} alt="avatar" id="image" />
                </td>
              </tr>
            ))}
          </tbody>)
          }
        </table>
      )}
    </div>
  );
};

export default App;