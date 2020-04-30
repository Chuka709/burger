import React, { Component } from "react";
import { connect } from "react-redux";
import css from "./style.module.css";
import Button from "../../components/General/Button";
import * as actions from "../../redux/action/loginActions";
import Spinner from "../../components/General/Spinner";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  login = () => {
    this.props.login(this.state.email, this.state.password);
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
  render() {
    return (
      <div className={css.Login}>
        {this.props.userId && <Redirect to="/orders" />}
        <h1>Нэвтрэх хэсэг</h1>
        <input
          onChange={this.changeEmail}
          type="text"
          placeholder="Email address"
        />
        <input
          onChange={this.changePassword}
          type="password"
          placeholder="Password"
        />
        {this.props.loggingIn && <Spinner />}
        {this.props.firebaseError && (
          <div style={{ color: "red" }}>
            {this.props.firebaseError} | {this.props.firebaseErrorCode}
          </div>
        )}
        <Button text="НЭВТРЭХ" btnType="Success" clicked={this.login} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggingIn: state.signupReducer.loggingIn,
    firebaseError: state.signupReducer.firebaseError,
    firebaseErrorCode: state.signupReducer.firebaseErrorCode,
    userId: state.signupReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(actions.loginUser(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
