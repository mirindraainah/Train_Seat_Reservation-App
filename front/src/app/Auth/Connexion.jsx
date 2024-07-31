import React, { useEffect, useState } from "react";

import "./Connexion.css";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export const Connexion = () => {
  const navigate = useNavigate();
  const { user, token, setUser, setToken } = useStateContext();
  // couleur de fond
  useEffect(() => {
    console.log("user", user);
    console.log("token", token);
    document.body.style.backgroundColor = "#ebebeb";
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.overflowY = "";
    };
  }, []);

  // champ formulaire
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [errors, setErrors] = useState({ email: "", mdp: "" });

  const handleChangeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
    setErrors({ ...errors, email: "" }); // Efface l'erreur de l'email
    setUser(value);
  };

  const handleChangePassword = (e) => {
    const { value } = e.target;
    setMdp(value);
    setErrors({ ...errors, mdp: "" }); // Efface l'erreur du mot de passe
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3030/connexion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, mdp }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/");
        setToken(mdp);
      } else {
        if (data.message.includes("Email")) {
          setErrors({ ...errors, email: data.message });
        } else if (data.message.includes("Mot de passe")) {
          setErrors({ ...errors, mdp: data.message });
        }
      }
    } catch (error) {
      console.error("Erreur connexion:", error);
    }
  };

  return (
    <div className="container auth">
      <div className="auth-left">
        <img src={"/assets/image_connexion.jpg"} alt="" />
      </div>
      <div className="auth-right">
        <Link to="/">
          <p
            style={{
              float: "right",
              marginTop: "-1.5em",
              marginRight: "-0.5em",
              fontWeight: "bolder",
            }}
          >
            x
          </p>
        </Link>
        <h3 className="">Se connecter</h3>
        <form onSubmit={handleSubmit}>
          <div className="auth-right input">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChangeEmail}
              required
            />
            {errors.email && (
              <small
                className="text-danger"
                style={{
                  marginTop: "-1em",
                  marginBottom: "-1em",
                  marginLeft: "0",
                  fontStyle: "italic",
                }}
              >
                {errors.email}
              </small>
            )}
          </div>
          <div className="auth-right input mt-3">
            <label htmlFor="mdp">Mot de passe :</label>
            <input
              type="password"
              name="mdp"
              value={mdp}
              onChange={handleChangePassword}
              required
            />
            {errors.mdp && (
              <small
                className="text-danger"
                style={{
                  marginTop: "-1em",
                  marginBottom: "-1em",
                  marginLeft: "0",
                  fontStyle: "italic",
                }}
              >
                {errors.mdp}
              </small>
            )}
          </div>

          <button type="submit" className="blue">
            Se connecter
          </button>
        </form>
        <p>
          Vous n'avez pas encore de compte?{" "}
          <Link to="/inscription">
            <span>S'inscrire</span>
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};
