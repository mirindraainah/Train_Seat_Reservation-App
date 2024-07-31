import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import { useStateContext } from "../app/context/ContextProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
export const Modal = ({ showModal, setShowModal, values }) => {
  const { user } = useStateContext();
  const navigate = useNavigate();
  const [qrCodeDataURL, setQrCodeDataURL] = useState("");
  const [pdfDataURL, setPdfDataURL] = useState("");
  const doReservation = async () => {
    await axios
      .post("http://localhost:3030/reservation", { ...values, email: user })
      .then((res) => {
        if (res.status == 200) {
          console.log(res.status);
          toast.success("Réservation réussie", {
            position: "top-right",
          });
          navigate("/reservation");
        } else {
          toast.error("Une erreur s'est produite", {
            position: "top-right",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    generateQRCode();
  }, [values]);
  const generateQRCode = () => {
    const qrContent = `
      Nom Ville: ${values.villearrive}
      Heure et date de départ: ${new Date(
        values.datedepart
      ).toLocaleDateString()} ${new Date(
      values.datedepart
    ).toLocaleTimeString()}
      Nom: ${values.nom}
      Email: ${user}
      CIN: ${values.cin}
      Nombre de places réservées: ${values.nbplace}
    `;

    QRCode.toDataURL(qrContent)
      .then((url) => {
        setQrCodeDataURL(url);
      })
      .catch((err) => {
        console.error("Erreur lors de la génération du code QR:", err);
      });
  };
  const generatePDF = () => {
    if (!qrCodeDataURL) {
      console.error("Code QR non disponible");
      return;
    }

    const pdf = new jsPDF();
    pdf.addImage(qrCodeDataURL, "JPEG", 10, 10, 80, 80);
    const pdfDataURL = pdf.output("datauristring");
    setPdfDataURL(pdfDataURL);
  };

  const envoyerEmail = () => {
    generateQRCode();
    generatePDF();
  
    const contenuEmail = `
      <p style="font-size: 16px; color: #0062d1;"><strong><i>T</i>rain Comp</strong><br/><p>
      <img src="https://png.pngtree.com/png-clipart/20230407/ourmid/pngtree-blue-train-cartoon-illustration-png-image_6678224.png" alt="Train" style="width: 100px; height: auto"/> <br/>
      <p style="font-size: 16px; color: black;"> Bonjour,<br/>
      La <strong> <i>T</i>rain Comp </strong> vous confirme votre réservation de place de train !<br/>
      Nom Ville : ${values.villearrive} <br/>
      Heure et date de départ : ${new Date(values.datedepart).toLocaleDateString()} ${new Date(values.datedepart).toLocaleTimeString()} <br/>
      Nom : ${values.nom} <br/>
      Email : ${user} <br/>
      CIN : ${values.cin} <br/>
      Nombre de places réservées : ${values.nbplace}<br/>
      Un code QR contenant ces informations vous a été mis en pièce jointe.<br/>
      Bon voyage !
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
  
    fetch("http://localhost:3030/envoyer-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        destinataire: user,
        sujet: "Réservation de place de train",
        contenu: contenuEmail,
        qrCode: qrCodeDataURL, // envoie le code QR sous forme de données URL
        pdf: pdfDataURL, // envoie le PDF sous forme de données URL
      }),
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            title: "Train Comp",
            text: "Un email vous a été envoyé",
            icon: "success",
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonColor: "#0062D1",
            cancelButtonText: "OK",
          });
          // alert("Email envoyé avec succès !");
        } else {
          console.log("email non envoyé");
        }
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de l'envoi de l'e-mail",
          error
        );
      });
  };
  
  // const envoyerEmail = () => {
    
  //   generateQRCode();
  //   generatePDF();

  //   const contenuEmail = `
  //   Bonjour,<br/>
  //   La <strong> <i>T</i>rain Comp </strong> vous confirme votre réservation de place de train !<br/>
  //   Nom Ville : ${values.villearrive} <br/>
  //   Heure et date de départ : ${new Date(
  //     values.datedepart
  //   ).toLocaleDateString()} ${new Date(
  //     values.datedepart
  //   ).toLocaleTimeString()} <br/>
  //   Nom : ${values.nom} <br/>
  //   Email : ${user} <br/>
  //   CIN :${values.cin} <br/>
  //   Nombre de places réservées : ${values.nbplace}<br/>
  //   Cordialement, bon voyage !
  //   <br/>
  // `;

  //   fetch("http://localhost:3030/envoyer-email", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       destinataire: user,
  //       sujet: "Réservation de place de train",
  //       contenu: contenuEmail,
  //       qrCode: qrCodeDataURL, // envoie le code QR sous forme de données URL
  //       pdf: pdfDataURL, // envoie le PDF sous forme de données URL
  //     }),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         Swal.fire({
  //           title: "Train Comp",
  //           text: "Un email vous a été envoyé",
  //           icon: "success",
  //           showCancelButton: true,
  //           showConfirmButton: false,
  //           cancelButtonColor: "#0062D1",
  //           cancelButtonText: "OK",
  //         });
  //         // alert("Email envoyé avec succès !");
  //       } else {
  //         // Swal.fire({
  //         //   title: "Train Comp",
  //         //   text: "Une erreur s'est produite lors de l'envoi de l'e-mail",
  //         //   icon: "error",
  //         //   animation: "fade",
  //         //   showCancelButton: true,
  //         //   showConfirmButton: false,
  //         //   cancelButtonColor: "#0062D1",
  //         //   cancelButtonText: "OK",
  //         // });
  //         console.log("email non envoyé");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "Une erreur s'est produite lors de l'envoi de l'e-mail",
  //         error
  //       );
  //     });
  // };
  return (
    <div>
      {showModal && (
        <div>
          <div className="modal-backdrop fade show"></div>
          {/* Modal */}
          <div
            className="modal fade show"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={{ display: "block" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5
                    className="modal-title"
                    id="exampleModalLabel"
                    style={{ color: "#0062D1" }}
                  >
                    Réservation
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Nom Ville : {values?.villearrive}</p>
                  <p>
                    Heure et date de départ :
                    {new Date(values.datedepart).toLocaleDateString()}{" "}
                    {new Date(values.datedepart).toLocaleTimeString()}
                  </p>{" "}
                  <br />
                  <p>Nom : {values?.nom}</p>
                  <p>Email : {user}</p>
                  <p>CIN : {values?.cin}</p>
                  <p>Nombre de places : {values?.nbplace} </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      doReservation();
                      envoyerEmail();
                    }}
                  >
                    Confirmer
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setShowModal(false)}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
