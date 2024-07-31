import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Train.css";
import axios from "axios";
import { useStateContext } from "../context/ContextProvider";

let api_url = "http://localhost:3030/trains";
export const Train = () => {
  const { user } = useStateContext();
  const [trains, setTrains] = useState([]);
  const [selectedDestination, setSelectedDestination] =
    useState("Destinations");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const identification = (us) => {
    if (us == "stellaliemiah@gmail.com") {
      api_url = "http://localhost:3030/trains/admin";
    }
  };
  const supprimer = (id) => {
    axios
      .delete("http://localhost:3030/supprimerTrain/" + id)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    identification(user);
    setTimeout(() => {
      axios
        .get(api_url)
        .then((res) => {
          console.log(res.data);
          setTrains(res.data);
        })
        .catch((err) => console.log("erreur", err));
    }, 0);
  }, []);

  // filtre date et destination
  const filteredTrains = trains.filter((train) => {
    if (
      selectedDestination !== "Destinations" &&
      train.villearrive !== selectedDestination
    )
      return false;
    if (
      selectedDate &&
      new Date(train.datedepart).toLocaleDateString() !==
        new Date(selectedDate).toLocaleDateString()
    )
      return false;

    return true;
  });

  const ajusterTemps = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <div className="">
        <div className="head">
          <div className="search">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <select
              name="destination"
              id="destination"
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
            >
              {[
                "Destinations",
                ...new Set(trains.map((train) => train.villearrive)),
              ].map((destination, index) => (
                <option key={index} value={destination}>
                  {destination}
                </option>
              ))}
            </select>
          </div>
          <div>
          {user == "stellaliemiah@gmail.com" && (
            <button onClick={() => navigate("/trains/ajout")}>Ajouter</button>
          )}
                     
          </div>
        </div>

        <div className="container principal">
          {trains.length == 0 && (
            <div className="principal" style={{ textAlign: "center" }}>
              <p>Rechargement ...</p>
            </div>
          )}
          {trains.length != 0 && (
            <>
              {" "}
              {user != "stellaliemiah@gmail.com" ? (
                <div className="trains">
                  {filteredTrains.length > 0 ? (
                    filteredTrains.map((train, index) => (
                      <div className="train" key={index}>
                        <div className="num-train">T{train.idtrain}</div>
                        <p>
                          <strong>Destination : {train.villearrive}</strong>
                        </p>
                        <p>
                          Départ :{" "}
                          {new Date(train.datedepart).toLocaleDateString()}{" "}
                          {ajusterTemps(train.datedepart)}
                        </p>
                        <p>Nombre de places libres : {train.nbplacemax}</p>
                        <p>Prix : {train.prix}</p>
                        <button
                          onClick={() => {
                            navigate("/trains/" + train.idtrain + "/reserver");
                          }}
                        >
                          Réserver
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="aucun">
                      <p>
                        Aucun train disponible pour cette destination et cette
                        date.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {" "}
                  <div className="trains">
                    {filteredTrains.length > 0 ? (
                      filteredTrains.map((train, index) => (
                        <div className="train " key={index}>
                          <div className="num-train">T{train.idtrain}</div>
                          <p>
                            <strong>Destination : {train.villearrive}</strong>
                          </p>
                          <p>
                            Départ :{" "}
                            {new Date(train.datedepart).toLocaleDateString()}{" "}
                            {ajusterTemps(train.datedepart)}
                          </p>
                          <p>Nombre de places libres : {train.nbplacemax}</p>
                          <p>Prix : {train.prix}</p>
                          <div className="bouton">
                            <button
                              onClick={() =>
                                navigate(
                                  "/trains/" + train.idtrain + "/modifier"
                                )
                              }
                              style={{ visibility: "hidden" }}
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() =>
                                navigate(
                                  "/trains/" + train.idtrain + "/modifier"
                                )
                              }
                              style={{ backgroundColor: "#0062d1", marginLeft: "-2vw" }}
                            >
                              Modifier
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="aucun">
                        <p>
                          Aucun train disponible pour cette destination et cette
                          date.
                        </p>
                      </div>
                    )}{" "}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

