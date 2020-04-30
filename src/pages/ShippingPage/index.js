import React, { Component } from "react";
import { connect } from "react-redux";
import css from "./style.module.css";
import Burger from "../../components/Burger";
import Button from "../../components/General/Button";
import { Route } from "react-router-dom";
import ContactData from "../../components/ContactData";

class ShippingPage extends Component {
  goBack = () => {
    this.props.history.goBack();
  };
  showContactData = () => {
    this.props.history.replace("/ship/contact");
  };
  render() {
    return (
      <div className={css.ShippingPage}>
        <p style={{ fontSize: "24px" }}>
          <strong>Таны захиалга амттай байх болно</strong>
        </p>
        <p style={{ fontSize: "24px" }}>
          <strong>ДҮН: {this.props.price}</strong>
        </p>
        <Burger />
        <Button clicked={this.goBack} btnType="Danger" text="ЗАХИАЛГА ЦУЦЛАХ" />
        <Button
          clicked={this.showContactData}
          btnType="Success"
          text="ХҮРГЭЛТИЙН МЭДЭЭЛЭЛ ОРУУЛАХ"
        />

        <Route path="/ship/contact">
          <ContactData />
        </Route>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    price: state.burgerReducer.totalPrice
  };
};

export default connect(mapStateToProps)(ShippingPage);
