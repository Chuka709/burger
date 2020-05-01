import React, { useState } from "react";
import { connect } from "react-redux";
import css from "./style.module.css";
import Button from "../../components/General/Button";
import * as actions from "../../redux/action/loginActions";
import Spinner from "../../components/General/Spinner";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const changeEmail = (e) => {
    //setEmail(e.target.value);
    const newEmail = e.target.value;
    setForm((formBefore) => ({
      email: newEmail,
      password: formBefore.password,
    }));
  };
  const changePassword = (e) => {
    //setPassword(e.target.value);
    const newPassword = e.target.value;
    setForm((formBefore) => ({
      email: formBefore.email,
      password: newPassword,
    }));
  };

  const login = () => {
    props.login(form.email, form.password);
  };
  return (
    <div className={css.Login}>
      {props.userId && <Redirect to="/orders" />}
      <h1>Нэвтрэх хэсэг</h1>
      <input onChange={changeEmail} type="text" placeholder="Email address" />
      <input onChange={changePassword} type="password" placeholder="Password" />
      {props.loggingIn && <Spinner />}
      {props.firebaseError && (
        <div style={{ color: "red" }}>
          {props.firebaseError} | {props.firebaseErrorCode}
        </div>
      )}
      <Button text="НЭВТРЭХ" btnType="Success" clicked={login} />
    </div>
  );
};

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
