import React, { useEffect, useState } from "react";
import { Link, NavLink, Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { user, setUser, setToken, token } = useStateContext();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      setVisible(prevScrollPos > currentScrollPos);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  const logout = () => {
    setToken(null);
    setUser(null);
  };
  if (!token) {
    return <Navigate to="/trainCompany" />;
  }
  return (
    <div
      className={
        isScrolled
          ? visible
            ? "stickyNavBar visible"
            : "stickyNavBar hidden"
          : "header visible"
      }
    >
      <NavLink to="/trains">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="45"
          viewBox="0 0 160 153"
        >
          <g
            id="Groupe_37"
            data-name="Groupe 37"
            transform="translate(-48 -44)"
          >
            <ellipse
              id="Ellipse_1"
              data-name="Ellipse 1"
              cx="80"
              cy="76.5"
              rx="80"
              ry="76.5"
              transform="translate(48 44)"
              fill="#0062d1"
            />
            <text
              id="Train_Comp"
              data-name="Train Comp"
              transform="translate(59 130)"
              fill="#fff"
              fontSize="35"
              fontFamily="FreestyleScript-Regular, Freestyle Script"
            >
              <tspan x="0" y="0">
                T
              </tspan>
              <tspan y="0" fontSize="27" fontFamily="SegoeUI, Segoe UI">
                rain
              </tspan>
              <tspan
                y="0"
                fontSize="27"
                fontFamily="FranklinGothic-Book, Franklin Gothic Book"
              >
                {" "}
                C
              </tspan>
              <tspan y="0" fontSize="27" fontFamily="SegoeUI, Segoe UI">
                omp
              </tspan>
            </text>
          </g>
        </svg>
      </NavLink>

      <ul>
        {" "}
        <NavLink
          to="/trains"
          className={(nav) => (nav.isActive ? "nav-active1" : "nav-active")}
        >
          {" "}
          <li style={{ cursor: "pointer" }}>Accueil</li>{" "}
        </NavLink>
        {user == "stellaliemiah@gmail.com" ? (
          <NavLink
            to="/Admin/trains/reservation"
            className={(nav) => (nav.isActive ? "nav-active2" : "nav-active")}
          >
            {" "}
            <li style={{ cursor: "pointer" }}> Réservation</li>
          </NavLink>
        ) : (
          <NavLink
            to="/reservation"
            className={(nav) => (nav.isActive ? "nav-active2" : "nav-active")}
          >
            {" "}
            <li style={{ cursor: "pointer" }}> Réservation</li>
          </NavLink>
        )}
        <div className="dropdown">
          <button className="dropbtn">{user?.substr(0, 1)}</button>
          <div className="dropdown-content">
            {/* <Link to="/User">Mon compte</Link> */}
            <Link to="/" onClick={logout}>
              Se déconnecter
            </Link>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Header;
