import React, { useContext } from "react";
import css from "./style.module.css";
import Burger from "../../components/Burger";
import Button from "../../components/General/Button";
import { Route } from "react-router-dom";
import ContactData from "../../components/ContactData";
import BurgerContext from "../../context/BurgerContext";

const ShippingPage = (props) => {
  const ctx = useContext(BurgerContext);
  const goBack = () => {
    props.history.goBack();
  };
  const showContactData = () => {
    props.history.replace("/ship/contact");
  };

  return (
    <div className={css.ShippingPage}>
      <p style={{ fontSize: "24px" }}>
        <strong>Таны захиалга амттай байх болно</strong>
      </p>
      <p style={{ fontSize: "24px" }}>
        <strong>ДҮН: {ctx.burger.totalPrice}</strong>
      </p>
      <Burger />
      <Button clicked={goBack} btnType="Danger" text="ЗАХИАЛГА ЦУЦЛАХ" />
      <Button
        clicked={showContactData}
        btnType="Success"
        text="ХҮРГЭЛТИЙН МЭДЭЭЛЭЛ ОРУУЛАХ"
      />

      <Route path="/ship/contact">
        <ContactData />
      </Route>
    </div>
  );
};

export default ShippingPage;
