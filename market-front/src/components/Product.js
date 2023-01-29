import React from "react";
import Card from "./Card";
import css from "./Product.css";
import products from "../resources/products";

export default function Product(props) {
  console.log(products[1]);
  const red_ninja = products[0];
  const black_ninja = products[1];
  return (
    <div>
      <main>
        {/* <section className="cards">
          <Card name={red_ninja.name} image={red_ninja.image} />
          <Card name={black_ninja.name} image={black_ninja.image} />
        </section>
         */}
        <section className="cards">
          {products.map(({ name, image, skill }) => {
            return <Card name={name} image={image} skill={skill} />;
          })}
        </section>
      </main>
    </div>
  );
}
