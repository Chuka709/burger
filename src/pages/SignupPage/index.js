import React, { useState, useContext } from "react";
import css from "./style.module.css";
import Button from "../../components/General/Button";
import Spinner from "../../components/General/Spinner";
import { Redirect } from "react-router-dom";

import UserContext from "../../context/UserContext";

const SignupPage = (props) => {
  const ctx = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const signup = () => {
    if (password === confirmPassword) {
      ctx.signupUser(email, password);
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
      {ctx.state.userId && <Redirect to="/" />}
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
      {ctx.state.error && <div style={{ color: "red" }}>{ctx.state.error}</div>}
      {ctx.state.saving && <Spinner />}
      <Button text="БҮРТГҮҮЛЭХ" btnType="Success" clicked={signup} />
    </div>
  );
};

export default SignupPage;
