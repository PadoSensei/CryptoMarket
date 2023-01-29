import React from "react";
import css from "./Homepage.css";
import solIcon from "../resources/solana-sol-icon.webp";

export default function Homepage(props) {
  return (
    <section>
      <div className="hero">
        <h1>Web3 Yo!</h1>
        <p>
          eiowcioencoiwc oieciec ieinienfienf ieiewiefiefj ewijiejiewjd
          jwdjdieiewj
        </p>
        <button className="header-cta">
          <a href="/Product"></a>
        </button>
      </div>

      <div>
        <img position="absolute" alt="test" width="500" src={solIcon}></img>
      </div>
    </section>
  );
}
