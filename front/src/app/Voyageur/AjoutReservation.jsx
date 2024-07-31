import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AjoutReservation.css";
import { Modal } from "../../components/Modal";
import { useParams, Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const AjoutReservation = () => {
  const [showModal, setShowModal] = useState(false);
  const [train, setTrain] = useState({});
  const { numTrain } = useParams();
  const [validation, setValidation] = useState(false);
  const { user } = useStateContext();
  const [values, setValues] = useState({});
  const [errorMessage, setErrorMessage] = useState({
    nom: "",
    email: "",
    cin: "",
  });
  const [content, setContent] = useState({
    datereservation: "",
    id: "",
    nom: "",
    email: "",
    cin: "",
    nbplace: "",
  });
  var d = new Date();
  var y = d.getFullYear();
  var j = d.getDate();
  var m = d.getMonth();
  if (m < 13) {
    m = d.getMonth() + 1;
  } else {
    m = d.getMonth();
  }

  if (j < 10) {
    j = "0" + j;
  }
  if (m < 10) {
    m = "0" + m;
  }
  const fullDate = `${y + "-" + m + "-" + j}`;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation) {
      setShowModal(true);
    }
    setValues({ ...content, ...train[0] });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (value.length == 0) {
      setErrorMessage({ ...errorMessage, [name]: "Ce champ est obligatoire" });
      setValidation(false);
    } else {
      if (name == "cin" && !value.match(/^[0-9]+$/)) {
        setErrorMessage({
          ...errorMessage,
          [name]: "Veuillez entrez un numéro CIN valide",
        });
        setValidation(false);
      } else if (name == "cin" && value.length != 12) {
        setErrorMessage({
          ...errorMessage,
          [name]: "Ce champ doit comporter 12 caractères",
        });
        setValidation(false);
      } else {
        setErrorMessage({ ...errorMessage, [name]: "" });
        setValidation(true);
        setContent({ ...content, [name]: value });
      }
    }
  };
  const getOneTrain = async (id) => {
    await axios
      .get(`http://localhost:3030/trains/${id}`)
      .then((response) => {
        setTrain(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getId = () => {
    axios
      .get(`http://localhost:3030/id/${user}`)
      .then((res) => {
        console.log("id", res.data[0].id);

        setContent({
          ...content,
          id: res.data[0].id,
          datereservation: fullDate,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOneTrain(numTrain);
    getId();
    // setContent({nbplacemax,idtrain,prix,...content});
  }, []);

  return (
    <div className="p" style={{ marginTop: "3em" }}>
      <Link to="/trains" style={{ textDecoration: "none" }}>
        <div className="container retour">
          <img src={"/assets/icons8_back_16.png"} alt="" />
          <p>Réservation</p>
        </div>
      </Link>

      <div className="content">
        {/* partie de description au dessus du formulaire */}
        <div className="desc">
          <div className="descriptions">
            <div className="description">
              <h5>{train[0]?.villearrive}</h5>
              <p>Ville</p>
            </div>
            <div className="description">
              <h5>
                {new Date(train[0]?.datedepart).toLocaleDateString()}{" "}
                {new Date(train[0]?.datedepart).toLocaleTimeString()}
              </h5>

              <p>Départ</p>
            </div>
            <div className="description">
              <h5>{train[0]?.nbplacemax}</h5>
              <p>Places libres</p>
            </div>
          </div>

          <div className="prix">
            <p>
              {" "}
              <strong>Prix :</strong> {train[0]?.prix} ar
            </p>
          </div>
        </div>

        <div className="container card2">
          <div className="container-form">
            <form onSubmit={handleSubmit}>
              <div className="input mt-5">
                <label htmlFor="nom">Nom :</label>
                <input
                  type="text"
                  name="nom"
                  onChange={handleChange}
                  required
                />
                <small
                  className="text-danger mb-2"
                  style={{ fontStyle: "italic" }}
                >
                  {errorMessage.nom}
                </small>
              </div>
              <div className="input mt-3">
                <label htmlFor="email">Email :</label>
                <input
                  type="email"
                  name="email"
                  className="mb-4"
                  value={user}
                  disabled
                />
                <small
                  className="text-danger mb-2"
                  style={{ fontStyle: "italic" }}
                >
                  {errorMessage.email}
                </small>
              </div>
              <div className="horizontal2 mt-2">
                <div className="input">
                  <label htmlFor="cin">Numéro CIN :</label>
                  <input
                    type="text"
                    name="cin"
                    onChange={handleChange}
                    required
                  />
                  <small
                    className="text-danger mb-2"
                    style={{ fontStyle: "italic" }}
                  >
                    {errorMessage.cin}
                  </small>
                </div>
                <div className="input ">
                  <label htmlFor="nbplace">Nombre de places :</label>
                  <input
                    type="number"
                    name="nbplace"
                    min={1}
                    max={train[0]?.nbplacemax}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <span className="btnCont">
                {" "}
                <button id="boutn" type="submit">
                  Terminé
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>

      {/* Passer showModal en tant que prop au composant Modal */}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        values={values}
      />
    </div>
  );
};
