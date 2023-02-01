import React from "react";
import Card from "./Card";
import css from "./Product.css";
import products from "../resources/products";

export default function Product(props) {
  // console.log(products[1]);

  return (
    <div>
      <main>
        <section>
          {products.map(({ name, image, skill, key, price }) => {
            return (
              <Card
                name={name}
                image={image}
                skill={skill}
                key={key}
                price={price}
              />
            );
          })}
        </section>
      </main>
    </div>
  );
}
