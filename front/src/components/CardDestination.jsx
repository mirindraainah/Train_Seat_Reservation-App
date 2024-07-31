import axios from "axios";
import React, { useEffect, useState } from "react";

const CardDestination = () => {
  const [dest, setDest] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/assets/train.jpg",
    "/assets/train5.jpg",
    "/assets/train6.jpg",
    "/assets/train7.jpg",
  ];

  const getAllReservation = () => {
    axios
      .get("http://localhost:3030/destination")
      .then((res) => {
        console.log(res.data);
        setDest(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllReservation();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        if (prevIndex === images.length - 1) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {dest?.map((des, index) => (
        <div className="CardDestination" key={index}>
          <div className="item border">
            <div className="top">
              <h4>{des.villearrive}</h4>
              <div className="circular-image">
                <img src={images[currentImageIndex]} alt="" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardDestination;
