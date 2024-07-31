import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <h2>
        <span>T</span>rain Comp
      </h2>
      <div className="center">
        <p> &copy; Copyright 2024</p>
      </div>
      <div className="right">
        <h6>Suivez - nous</h6>
        <div className="reseau">
          <img src="/assets/icon_tw.png" alt="twitter" />
          <img src="/assets/icon_ig.png" alt="instagram" />
          <img src="/assets/icon_facebook.png" alt="facebook" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
