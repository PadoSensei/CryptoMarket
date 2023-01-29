import React from "react";
import css from "./Card.css";

const Card = ({ image, name, skill }) => {
  return (
    <main className="card">
      <div className="card__image-container">
        <img src={image} width="400" alt="description" />
      </div>

      <div className="card__content">
        <p className="card__title text--medium">{name}</p>
        <div className="card__info">
          <p className="text--medium">SKILL:{skill}</p>
        </div>
        <div>
          <img className="buyIcon" src="https://imgur.com/MQHRBrg.png"></img>
          <img className="buyIcon" src="https://imgur.com/wndKTZS.png"></img>
          <img className="buyIcon" src="https://imgur.com/sQsv7UD.png"></img>
        </div>
        <div>
          <p className="card__price text__price">
            This will be the price of the item
          </p>
        </div>
      </div>
    </main>
  );
};

export default Card;
