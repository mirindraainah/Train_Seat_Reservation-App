import React from "react";

const Apropos = ({ about }) => {
  return (
    <div id="Apropos" ref={about}>
      <img
        src="/assets/ALTE - Railway France_Italy.gif"
        alt="worker"
        width={200}
      />
      <div className="right">
        <h1>
          <span>T</span>rain Company
        </h1>
        <p style={{ textAlign : "justify"}}>
          <i>T</i>rain Comp est une compagnie de voyage en train. <br />
          Découvrez nos voyages en train : circuits autonomes et trains de luxe,<br /> nos spécialistes ont sélectionné les plus beaux circuits ferroviaires à <br /> Madagascar et sur les provinces.
          Partez à l’aventure sans guide et<br /> sans accompagnateur. Découvrez le pays avec votre propre regard <br /> en profitant, avant le départ et au besoin en route, du soutien logistique<br /> éclairé de nos experts et de nos contacts locaux. <br />{" "}
         <br />
          
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="133.694"
          height="135.076"
          viewBox="0 0 133.694 135.076"
        >
          <g
            id="Groupe_86"
            data-name="Groupe 86"
            transform="matrix(0.899, -0.438, 0.438, 0.899, -2091.265, -229.467)"
          >
            <ellipse
              id="Ellipse_3"
              data-name="Ellipse 3"
              cx="22"
              cy="20.5"
              rx="22"
              ry="20.5"
              transform="translate(1760 1162)"
              fill="#0062d1"
            />
            <ellipse
              id="Ellipse_4"
              data-name="Ellipse 4"
              cx="22"
              cy="20.5"
              rx="22"
              ry="20.5"
              transform="translate(1815 1162)"
              fill="#0062d1"
            />
            <ellipse
              id="Ellipse_5"
              data-name="Ellipse 5"
              cx="22"
              cy="20.5"
              rx="22"
              ry="20.5"
              transform="translate(1760 1223)"
              fill="#0062d1"
            />
            <ellipse
              id="Ellipse_6"
              data-name="Ellipse 6"
              cx="22"
              cy="20.5"
              rx="22"
              ry="20.5"
              transform="translate(1815 1223)"
              fill="#0062d1"
            />
          </g>
        </svg>
      </div>
    </div>
    
  );
};

export default Apropos;
