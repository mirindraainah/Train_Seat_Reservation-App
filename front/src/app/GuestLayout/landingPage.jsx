import React, { useEffect, useRef, useState } from "react";

import "../styles.css";
import Header from "../../components/header";
import Main from "../../components/main";
import Apropos from "../../components/Apropos";
import Destination from "../../components/Destination";
import Contact from "../../components/contact";
import Footer from "../../components/Footer";
import { useStateContext } from "../context/ContextProvider";

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { user, token } = useStateContext;
  const [visible, setVisible] = useState(true);
  const about = useRef();
  const destination = useRef();
  const contact = useRef();
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
  return (
    <div className="landing">
      <div className="first-view">
        <Header
          isScrolled={isScrolled}
          visible={visible}
          about={about}
          destination={destination}
          contact={contact}
        />
        <Main />
      </div>

      <Apropos about={about} />
      <Destination destination={destination} />
      <div className="foot" ref={contact}>
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
