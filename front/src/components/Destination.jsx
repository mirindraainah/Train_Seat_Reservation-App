import React from "react";
import CardDestination from "./CardDestination";

const Destination = ({ destination }) => {
  
  return (
    <div className="destination" ref={destination}>
      <h4>Nos destinations</h4>
      <div className="content">
        <CardDestination />
      
      </div>
    </div>
  );
};

export default Destination;
