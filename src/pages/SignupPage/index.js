import React, { Component } from "react";
import css from "./style.module.css";
import Button from "../../components/General/Button";
import Spinner from "../../components/General/Spinner";
import * as actions from "../../redux/action/signupActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
class SignupPage extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  };
  signup = () => {
    if (this.state.password === this.state.confirmPassword) {
      this.props.signupUser(this.state.email, this.state.password);
    } else {
      this.setState({ error: "Нууц үгнүүд хоорондоо таарахгүй байна" });
    }
  };
  changeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  changePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  changeConfirmPassword = (e) => {
    this.setState({
      confirmPassword: e.target.value,
    });
  };
  render() {
    return (
      <div className={css.Signup}>
        {this.props.userId && <Redirect to="/" />}
        <h1>Бүртгэлийн хэсэг</h1>
        <div>Та өөрийн мэдээллээ оруулна уу</div>
        <input
          onChange={this.changeEmail}
          type="text"
          placeholder="Цахим шуудангийн хаягаа оруулна уу"
        />
        <input
          onChange={this.changePassword}
          type="password"
          placeholder="Нууц үгээ оруулна уу"
        />
        <input
          onChange={this.changeConfirmPassword}
          type="password"
          placeholder="Нууц үгээ давтан оруулна уу"
        />
        {this.state.error && (
          <div style={{ color: "red" }}>{this.state.error}</div>
        )}
        {this.props.firebaseError && (
          <div style={{ color: "red" }}>{this.props.firebaseError}</div>
        )}
        {this.props.saving && <Spinner />}
        <Button text="БҮРТГҮҮЛЭХ" btnType="Success" clicked={this.signup} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    saving: state.signupReducer.saving,
    firebaseError: state.signupReducer.firebaseError,
    userId: state.signupReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signupUser: (email, password) =>
      dispatch(actions.signupUser(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
