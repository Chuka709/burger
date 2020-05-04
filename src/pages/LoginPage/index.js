import React, { useState, useContext } from "react";
import css from "./style.module.css";
import Button from "../../components/General/Button";
import Spinner from "../../components/General/Spinner";
import { Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Login = (props) => {
  const ctx = useContext(UserContext);

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
    ctx.loginUser(form.email, form.password);
  };
  return (
    <div className={css.Login}>
      {ctx.state.userId && <Redirect to="/orders" />}
      <h1>Нэвтрэх хэсэг</h1>
      <input onChange={changeEmail} type="text" placeholder="Email address" />
      <input onChange={changePassword} type="password" placeholder="Password" />
      {ctx.state.loggingIn && <Spinner />}
      {ctx.state.error && (
        <div style={{ color: "red" }}>
          {ctx.state.error} | {ctx.state.errorCode}
        </div>
      )}
      <Button text="НЭВТРЭХ" btnType="Success" clicked={login} />
    </div>
  );
};

export default Login;
