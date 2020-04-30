import React from "react";
import { connect } from "react-redux";

import Button from "../General/Button";

const OrderSummary = props => {
  return (
    <div>
      <h3>Таны захиалга</h3>
      <p>Таны сонгосон орцууд</p>
      <ul>
        {Object.keys(props.ingredients).map(el => (
          <li key={el}>
            {props.ingredientNames[el]} : {props.ingredients[el]}
          </li>
        ))}
      </ul>
      <p>
        <strong>Захиалгын дүн: {props.price}₮</strong>
      </p>
      <p>To be continue...</p>
      <Button clicked={props.onCancel} btnType="Danger" text="ТАТГАЛЗАХ" />
      <Button
        clicked={props.onContinue}
        btnType="Success"
        text="ҮРГЭЛЖЛҮҮЛЭХ"
      />
    </div>
  );
};
const mapStateToProps = state => {
  return {
    ingredients: state.burgerReducer.ingredients,
    ingredientNames: state.burgerReducer.ingredientNames,
    price: state.burgerReducer.totalPrice
  };
};
export default connect(mapStateToProps)(OrderSummary);
