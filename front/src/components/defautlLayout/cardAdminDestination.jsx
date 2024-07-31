import React from "react";
import "./styles.css";
const CardAdminDestination = () => {
  return (
    <div className="cardAdminDestination">
      <div className="numero">
        <p>N°1</p>
      </div>
      <div>
        {" "}
        <h3>Destination : Ville</h3>
        <p>
          Date départ : 14/04/2024 <br />
          Nombre de place : 5 <br />
          Prix : 40.000 ar
        </p>
        <div className="bouton">
          <button>Modifier</button>
          <button>Supprimer</button>
        </div>
      </div>
    </div>
  );
};

export default CardAdminDestination;
