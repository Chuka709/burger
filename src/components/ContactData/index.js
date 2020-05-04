import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import css from "./style.module.css";
import Button from "../General/Button";
import Spinner from "../General/Spinner";
import BurgerContext from "../../context/BurgerContext";
import UserContext from "../../context/UserContext";

const ContactData = (props) => {
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [street, setStreet] = useState();

  const ctx = useContext(BurgerContext);
  const userCtx = useContext(UserContext);

  const history = useHistory();

  const dunRef = useRef();
  useEffect(() => {
    console.log("contact data effect");
    if (ctx.burger.finished && !ctx.burger.error) {
      history.replace("/orders");
    }

    return () => {
      //Tseverlegch function: Zahialgiig butsaaj hoosolj daraagiin zahialgand beltgene
      ctx.clearBurger();
    };
  }, [ctx.burger.finished]);

  const changeName = (e) => {
    if (dunRef.current.style.color === "red")
      dunRef.current.style.color = "green";
    else dunRef.current.style.color = "red";
    setName(e.target.value);
  };
  const changeStreet = (e) => {
    setStreet(e.target.value);
  };
  const changeCity = (e) => {
    setCity(e.target.value);
  };

  const saveOrder = () => {
    const newOrder = {
      userId: userCtx.state.userId,
      orts: ctx.burger.ingredients,
      dun: ctx.burger.totalPrice,
      hayag: {
        name,
        city,
        street,
      },
    };
    ctx.saveBurger(newOrder, userCtx.state.token);
  };

  return (
    <div className={css.ContactData}>
      <div ref={dunRef}>
        <strong style={{ fontSize: "16px" }}>
          Дүн: {ctx.burger.totalPrice}₮
        </strong>
      </div>
      <div>{ctx.burger.error && `Order saving error: ${ctx.burger.error}`}</div>
      {ctx.burger.saving ? (
        <Spinner />
      ) : (
        <div>
          <input
            onChange={changeName}
            type="text"
            name="name"
            placeholder="Таны нэр"
          />
          <input
            onChange={changeStreet}
            type="text"
            name="street"
            placeholder="Таны гэрийн хаяг"
          />
          <input
            onChange={changeCity}
            type="text"
            name="city"
            placeholder="Таны хот"
          />
          <Button text="ИЛГЭЭХ" btnType="Success" clicked={saveOrder} />
        </div>
      )}
    </div>
  );
};

export default ContactData;
