import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const Header = ({ isScrolled, visible, about, destination, contact }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const scrollToSection = (elementRef) => {
    window.scrollTo({ top: elementRef.current.offsetTop, behavior: "smooth" });
  };
  const listSpan = useRef();
  const handleClick = () => {
    if (listSpan.current.className == "open") {
      listSpan.current.className = "spanbtn";
    } else {
      listSpan.current.className = "open";
    }
    setIsOpen(!isOpen);
  };
  return (
    <div className="landingHeader">
      <div className="svg">
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50%"
          height="20%"
          viewBox="0 0 1205.456 732.074"
        >
          <path
            id="Tracé_4"
            data-name="Tracé 4"
            d="M0,0H945.394l19.277.238h233.784V18l2.646,18.238V67.614L1198.455,91.8l-7.56,26.459-21.167,22.679-33.074,13.607-36.84,3.116-51.927,5.473h-170.3l-29.477-4.327L757.4,177.338l-50.944,19.483L664.933,221.1l-68.351,58.769-49.826,54.3-54.3,70.906L394.085,557.1,331.64,642.057l-21.167,26.459L248.294,712.74,211.818,723.7l-33.641,4.158L143.5,723.7,102.392,712.74s-15.13-6.837-40.728-23.813S0,644.835,0,644.835H0Z"
            fill="rgba(0,98,209,0.37)"
          />
          <path
            id="Tracé_3"
            data-name="Tracé 3"
            d="M18.5,737.409s154.788,166.457,298.231,36.833,242.519-495.6,543.737-517.35c.465.093,55.2.007,59.295,0,5.883-.01,17.64.008,18.974,0,3.723-.021-1.149-.135,0,0,2.844.35-44.666.8,21.724,0,98.558-1.662,98.558,1.145,116.8,0,43.438,1,78.489-5.587,102.451-14.293,12.2-4.432,28.637-22.01,35.37-42.582s5.318-92.989,0-103.292c-.47-.9.786,4.366,0,0"
            transform="translate(-18.5 -96.141)"
            fill="none"
            stroke="#0062d1"
            strokeWidth="5"
          />
        </svg>
      </div>
      <div
        className={
          isScrolled
            ? visible
              ? "stickyNavBar visible"
              : "stickyNavBar hidden"
            : "head visible"
        }
      >
        <div className="nav-bar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            viewBox="0 0 160 153"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{ cursor: "pointer" }}
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
          <div className="spanbtn" ref={listSpan} onClick={handleClick}>
            {" "}
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className={isOpen ? "open" : null}>
            <li
              onClick={() => {
                handleClick();
                scrollToSection(about);
              }}
            >
              A propos
            </li>
            <li
              onClick={() => {
                handleClick();
                scrollToSection(destination);
              }}
            >
              {" "}
              Destination
            </li>
            <li
              onClick={() => {
                handleClick();
                scrollToSection(contact);
              }}
            >
              Contactez - nous
            </li>
          </ul>
        </div>
        <span className="right" onClick={() => navigate("/connexion")}>
          <img src="/assets/person.svg" alt="icon" />
          Se connecter
        </span>
      </div>
    </div>
  );
};

export default Header;
