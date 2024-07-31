import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Search from "../../components/defautlLayout/Search";
import { toast } from "react-toastify";
import { useStateContext } from "../context/ContextProvider";
import Swal from "sweetalert2";

const Reservation = () => {
  const { user } = useStateContext();
  const [reserv, setReser] = useState([]);
  const [selectedDestination, setSelectedDestination] =
    useState("Destinations");
  const [selectedDate, setSelectedDate] = useState("");

  const getAllReservation = () => {
    axios
      .get("http://localhost:3030/tousReservation/" + user)
      .then((res) => {
        console.log(res.data);
        setReser(res.data);
      })
      .catch((err) => console.log(err));
  };

  // mail annulation
  const envoyerConfirmationAnnulation = (rsv) => {
    return new Promise((resolve, reject) => {
      const contenuEmail = `
        <p style="font-size: 16px; color: #0062d1;"><strong><i>T</i>rain Comp</strong><br/><p>
        <img src="https://png.pngtree.com/png-clipart/20230407/ourmid/pngtree-blue-train-cartoon-illustration-png-image_6678224.png" alt="Train" style="width: 100px; height: auto"/><br/>
        <p style="font-size: 16px; font-family: arial; color: black;">Bonjour,<br/>
        Votre réservation de place de train du ${new Date(rsv.datereservation).toLocaleDateString()} pour ${
        rsv.villearrive
      } le  ${new Date(rsv.datedepart).toLocaleDateString()} à ${new Date(
        rsv.datedepart
      ).toLocaleTimeString()} a été annulée avec succès.<br/>
        <br/> </p>
        <div style="margin-top: 20px; border-top: 1px solid #eaeaea; padding-top: 10px;">
        <p style="font-size: 14px; color: #555;">
          Cordialement,<br/>
          <strong><i>T</i>rain Comp</strong><br/>
          <a href="http://www.traincomp.com" style="color: #0062D1; text-decoration: none;">www.traincomp.com</a><br/>
          <span style="font-size: 12px; color: #777;">Téléphone : +261 34 00 211 08</span><br/>
          <span style="font-size: 12px; color: #777;">Adresse : 123 Rue de la Gare, Fianrantsoa 301, Madagascar</span>
        </p>
        </div>
       
      `;

      fetch("http://localhost:3030/envoyer-email-annulation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destinataire: user,
          sujet: "Confirmation d'annulation de réservation de place de train",
          contenu: contenuEmail,
        }),
      })
        .then((response) => {
          if (response.ok) {
            resolve();
          } else {
            reject(
              "Une erreur s'est produite lors de l'envoi de l'e-mail de confirmation"
            );
          }
        })
        .catch((error) => {
          console.error(
            "Une erreur s'est produite lors de l'envoi de l'e-mail de confirmation",
            error
          );
        });
    });
  };

  // annulation réservation
  const AnnulerReservation = async (id, nb) => {
    const reservation = reserv.find((r) => r.idRes === id);

    // temps de différence entre date de départ et maintenant
    const dateDep = new Date(reservation.datedepart);
    const temps = dateDep.getTime() - new Date().getTime();
    const quaranteHuitHeures = 48 * 60 * 60 * 1000;

    if (temps <= quaranteHuitHeures) {
      Swal.fire({
        title: "Train Comp",
        text: "Impossible d'annuler cette réservation car la date de départ est dans moins de 48 heures. ",
        icon: "info",
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonColor: "#3085d6",
        confirmButtonText: "OUI",
        cancelButtonText: "OK",
      });

      return;
    }

    Swal.fire({
      title: "Voulez-vous annuler cette réservation ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "OUI",
      cancelButtonText: "NON",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost:3030/annulerReservation/", {
            id: id,
            nbplace: nb,
          })
          .then((response) => {
            if (response.status === 200) {
              console.log(response.status);
              toast.success(
                "Annulation réussie, un email de confirmation vous a été envoyé",
                {
                  position: "top-right",
                }
              );
              getAllReservation();
            } else {
              toast.error("Une erreur s'est produite", {
                position: "top-right",
              });
            }
          })
          .catch((err) => {
            console.log(
              "Une erreur s'est produite lors de l'annulation de la réservation",
              err
            );
          });

        envoyerConfirmationAnnulation(reservation);
      }
    });
  };

  useEffect(() => {
    getAllReservation();
  }, []);

  // filtre date et destination
  const filteredRes = reserv.filter((train) => {
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

  return (
    <>
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
            ...new Set(reserv.map((train) => train.villearrive)),
          ].map((destination, index) => (
            <option key={index} value={destination}>
              {destination}
            </option>
          ))}
        </select>
      </div>
      <div
        className="container reservation"
        style={{ position: "relative", padding: "35px" }}
      >
        {reserv.length != 0 ? (
          <>
            {" "}
            {filteredRes.length > 0 ? (
              filteredRes.map((rsv, index) => (
                <div className="cardReservation" key={index}>
                  <h2>{rsv.villearrive}</h2>
                  <p>
                    Date départ :{" "}
                    {new Date(rsv.datedepart).toLocaleDateString()}{" "}
                    {new Date(rsv.datedepart).toLocaleTimeString()}
                  </p>
                  <p>Nombre de place : {rsv.nbplacereserve}</p>
                  <p>
                    Date réservation :{" "}
                    {new Date(rsv.datereservation).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() =>
                      AnnulerReservation(rsv.idRes, rsv.nbplacereserve)
                    }
                  >
                    Annuler
                  </button>
                </div>
              ))
            ) : (
              <div
                className="aucun"
                style={{
                  position: "absolute",
                  width: "100%",
                  textAlign: "center",
                  paddingTop: "20px",
                }}
              >
                <p style={{ textAlign: "center" }}>
                  Aucun train disponible pour cette destination et cette date.
                </p>
              </div>
            )}
          </>
        ) : (
          <div
            className="aucun"
            style={{
              position: "absolute",
              width: "100%",
              textAlign: "center",
              paddingTop: "20px",
            }}
          >
            <p>Liste vide ...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Reservation;
