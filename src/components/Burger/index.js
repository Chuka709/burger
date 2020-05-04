import React, { useContext } from "react";
import BurgerIngredient from "../BurgerIngredient";
import css from "./style.module.css";

import BurgerContext from "../../context/BurgerContext";

const Burger = (props) => {
  const burgerContext = useContext(BurgerContext);
  let content = [];
  const items = Object.entries(burgerContext.burger.ingredients);
  //console.log(items);
  items.map((el) => {
    for (let i = 0; i < el[1]; i++) {
      content.push(<BurgerIngredient key={`${el[0]}${i + 1}`} type={el[0]} />);
    }
  });
  if (content.length === 0) {
    content = <p>Хачиртай талхны орцыг сонгоно уу...</p>;
  }
  return (
    <div className={css.Burger}>
      <BurgerIngredient type="bread-top" />
      {content}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
