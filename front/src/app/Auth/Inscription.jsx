import React, { useEffect, useState } from "react";
import "./Inscription.css";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export const Inscription = () => {
  const navigate = useNavigate();
  const { user, setUser, toke, setToken } = useStateContext();
  // couleur de fond
  useEffect(() => {
    document.body.style.backgroundColor = "#ebebeb";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [confirmMdp, setConfirmMdp] = useState("");
  const [error, setError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mdp !== confirmMdp) {
      setConfirmError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await fetch("http://localhost:3030/inscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, mdp }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setUser(email);
        setToken(mdp);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Erreur inscription:", error);
    }
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setError(""); // Réinitialise l'erreur sur le champ email
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setMdp(value);
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmMdp(value);
    if (value !== mdp) {
      setConfirmError("Les mots de passe ne correspondent pas");
    } else {
      setConfirmError("");
    }
  };

  return (
    <div className="container auth">
      <div className="auth-left-i">
        <img src={"/assets/image_connexion.jpg"} alt="" />
      </div>
      <div className="auth-right-i">
        <Link to="/">
          <p style={{float:'right', marginTop:'-0.8em', marginRight:'-0.5em', fontWeight:'bolder'}}>x</p>
        </Link>
        <h3 className="">S'inscrire</h3>
        <form onSubmit={handleSubmit}>
          <div className="auth-right-i input mb-2">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {error && (
              <small
                className="text-danger"
                style={{
                  marginTop: "-1em",
                  marginBottom: "-1em",
                  marginLeft: "0",
                  fontStyle: "italic",
                }}
              >
                {error}
              </small>
            )}
          </div>
          <div className="auth-right-i input mb-2">
            <label htmlFor="mdp">Mot de passe :</label>
            <input
              type="password"
              name="mdp"
              value={mdp}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="auth-right-i input">
            <label htmlFor="confirmMdp">Confirmation :</label>
            <input
              type="password"
              name="confirmMdp"
              value={confirmMdp}
              onChange={handleConfirmPasswordChange}
              required
            />
            {confirmError && (
              <small
                className="text-danger"
                style={{
                  marginTop: "-1em",
                  marginBottom: "-0.5em",
                  marginLeft: "0",
                  fontStyle: "italic",
                }}
              >
                {confirmError}
              </small>
            )}
          </div>
          <button type="submit">S'inscrire</button>
        </form>
        <p>
          Vous avez déjà un compte?{" "}
          <Link to="/connexion">
            <span>Se connecter</span>
          </Link>
        </p>
      </div>
    </div>
  );
};
