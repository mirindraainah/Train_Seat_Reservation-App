import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Ajout.css";
import "../Voyageur/Train.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useStateContext } from "../context/ContextProvider";

export const Ajout = () => {
  const [train, setTrain] = useState([]);
  const { user } = useStateContext();
  const navigate = useNavigate();
  const url = window.location.href;
  const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();

    // vérification formulaire
    const form = e.target.form;
    if (form.checkValidity()) {
      if (url.match("modifier")) {
        modifier(train.idtrain);
      } else {
        ajouterTrain();
      }
    } else {
      form.reportValidity();
    }
  };

  const ajouterTrain = () => {
    axios
      .post("http://localhost:3030/train", train)
      .then((res) => {
        if (res.status == 200) {
          toast.success("Ajout réussi", {
            position: "top-right",
          });
          navigate("/");
        } else {
          toast.error("Une erreur s'est produite", {
            position: "top-right",
          });
        }
      })
      .catch((err) => console.log(err));
  };
  const getOneTrain = async () => {
    await axios
      .get("http://localhost:3030/trains/" + id)
      .then((res) => {
        console.log(res.data[0]);
        setTrain(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const modifier = async (id) => {
    await axios
      .put("http://localhost:3030/modifierTrain/" + id, train)
      .then((res) => {
        if (res.status == 200) {
          toast.success("Modification réussie", {
            position: "top-right",
          });
          navigate("/");
        } else {
          toast.error("Une erreur s'est produite", {
            position: "top-right",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user != "stellaliemiah@gmail.com") {
      navigate("/");
    }
    getOneTrain();
  }, []);

  const ajusterTemps = (dateString) => {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset(); // Récupérer le décalage horaire local en minutes
    date.setMinutes(date.getMinutes() - offset); // Ajuster la date en fonction du décalage horaire local
    return date.toISOString().slice(0, 16); // Retourner la date ajustée
  };

  return (
    <div style={{ marginTop: "2em" }}>
      <Link to="/trains" style={{ textDecoration: "none" }}>
        <div className="container retour">
          <img src={"/assets/icons8_back_16.png"} alt="" />
          <p>Liste des trains</p>
        </div>
      </Link>
      <div className="container card principal-card">
        <div className="container-form">
          <form action="" onSubmit={handleSubmit}>
            <div className="input">
              <label htmlFor="destination">Destination :</label>
              <input
                type="text"
                name="destination"
                className="mb-4"
                value={
                  train.villearrive ? train.villearrive.toUpperCase() : null
                }
                onChange={(e) =>
                  setTrain({
                    ...train,
                    villearrive: e.target.value.toUpperCase(),
                  })
                }
                required
              />
            </div>
            <div className="input mt-3">
              <label htmlFor="date_heure">Date et heure :</label>
              <input
                type="datetime-local"
                name="date_heure"
                className="mb-4"
                value={train.datedepart ? ajusterTemps(train.datedepart) : ""}
                onChange={(e) =>
                  setTrain({ ...train, datedepart: e.target.value })
                }
                required
              />
            </div>
            <div className="horizontal mt-3">
              <div className="input">
                <label htmlFor="place_max">Place maximum :</label>
                <input
                  type="number"
                  name="place_max"
                  min={1}
                  className=""
                  value={train.nbplacemax}
                  onChange={(e) =>
                    setTrain({ ...train, nbplacemax: e.target.value })
                  }
                  required
                />
              </div>
              <div className="input">
                <label htmlFor="prix">Prix :</label>
                <input
                  type="number"
                  name="prix"
                  value={train.prix}
                  onChange={(e) => setTrain({ ...train, prix: e.target.value })}
                  required
                />
              </div>
            </div>
            {!url.match("modifier") && (
              <button type="submit" onClick={(e) => handleSubmit(e)}>
                Enregistrer
              </button>
            )}
            {url.match("modifier") && (
              <div className="trainbtn">
                <div className="bouton">
                  <button onClick={(e) => handleSubmit(e)}>Modifier</button>
                  <button onClick={() => navigate("/trains")}>Annuler</button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
