import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AdminReservation = () => {
  const { user } = useStateContext();
  const [details, setDetails] = useState();
  const navigate = useNavigate();
  const getDetails = () => {
    axios
      .get("http://localhost:3030/details")
      .then((res) => {
        console.log(res.data);
        setDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getDetails();
  }, []);
  if (user != "stellaliemiah@gmail.com") {
    navigate("/reservation");
  }
  return (
    <div className="AdminReservation">
      <div className="reservation">
        {details?.map((dt, index) => (
          <div className="cardAdminReservation" key={index} >
            <>
              {" "}
              <div className="mainTop">
                <h3>{dt.villearrive}</h3>
                <p>
                  Date départ :{new Date(dt.datedepart)?.toLocaleDateString()}{" "}
                  {""}
                  {new Date(dt.datedepart)?.toLocaleTimeString()}
                  <br />
                  Nombre de place : {dt.nbplacereserve} <br />
                  Date de reservation :{" "}
                  {new Date(dt.datereservation)?.toLocaleDateString()} {""}
                  {new Date(dt.datereservation)?.toLocaleTimeString()}
                </p>
              </div>
              <div className="mainBottom">
                <h3>{dt.nom}</h3>
                <p>{dt.email}</p>
              </div>
            </>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReservation;
