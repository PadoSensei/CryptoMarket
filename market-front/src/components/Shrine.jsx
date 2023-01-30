import React from "react";
import Dojo from "../resources/Dojo.png";

const Shrine = () => {
  return (
    <div>
      <div className="image-container">
        <img
          className="dojo"
          alt="Japanese style building representing a martial arts dojo"
          src={Dojo}
        ></img>
      </div>
    </div>
  );
};

export default Shrine;
