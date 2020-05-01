import React, { useState } from "react";
import css from "./style.module.css";
import Button from "../../components/General/Button";
import Spinner from "../../components/General/Spinner";
import * as actions from "../../redux/action/signupActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const SignupPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const signup = () => {
    if (password === confirmPassword) {
      props.signupUser(email, password);
    } else {
      setError("Нууц үгнүүд хоорондоо таарахгүй байна");
    }
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className={css.Signup}>
      {props.userId && <Redirect to="/" />}
      <h1>Бүртгэлийн хэсэг</h1>
      <div>Та өөрийн мэдээллээ оруулна уу</div>
      <input
        onChange={changeEmail}
        type="text"
        placeholder="Цахим шуудангийн хаягаа оруулна уу"
      />
      <input
        onChange={changePassword}
        type="password"
        placeholder="Нууц үгээ оруулна уу"
      />
      <input
        onChange={changeConfirmPassword}
        type="password"
        placeholder="Нууц үгээ давтан оруулна уу"
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {props.firebaseError && (
        <div style={{ color: "red" }}>{props.firebaseError}</div>
      )}
      {props.saving && <Spinner />}
      <Button text="БҮРТГҮҮЛЭХ" btnType="Success" clicked={signup} />
    </div>
  );
};

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
