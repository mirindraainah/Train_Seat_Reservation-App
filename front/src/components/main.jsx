import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Main = () => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="main">
      <div className="left">
        <div className="top">
          <h2>Explorez,</h2>
          <h1>
            VOY<span>AGEZ EN TRAIN</span>
          </h1>
          <p id="typer1">
            Découvrez votre destination de rêve en Train
          </p>
          <p id="typer2">
            Seul, en famille ou avec des amis
          </p>



        </div>
        <button onClick={() => navigate("/connexion")}>Reserver</button>
      </div>
      <div className="right">
        <img src="./assets/trainApp.jpg" alt="vecto person" />
        <div className="aside">
          <img src="/assets/icon_up.png" alt="icon up" onClick={scrollToTop} />
          <div className="reseau">
            <img src="/assets/icon_tw.png" alt="twitter" />
            <img src="/assets/icon_ig.png" alt="instagram" />
            <img src="/assets/icon_facebook.png" alt="facebook" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
