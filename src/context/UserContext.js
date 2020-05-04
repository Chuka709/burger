import React, { useState } from "react";
import axios from "../axios-orders";

const UserContext = React.createContext();

const initialState = {
  saving: false,
  loggingIn: false,
  error: null,
  errorCode: null,
  token: null,
  userId: null,
  expireDate: null,
};

export const UserStore = (props) => {
  const [state, setState] = useState(initialState);

  const loginUserSuccess = (token, userId, expireDate, refreshToken) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("expireDate", expireDate);
    localStorage.setItem("refreshToken", refreshToken);

    setState({
      ...state,
      loggingIn: false,
      error: null,
      errorCode: null,
      token,
      userId,
      expireDate,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expireDate");
    localStorage.removeItem("refreshToken");
    setState({ initialState });
  };

  const autoRenewTokenAfterMillisec = (ms) => {
    //Token shinechleh code bichij bolno
    axios
      .post(
        "https://securetoken.googleapis.com/v1/token?key=AIzaSyAs1nt2Me2r-G-6_lEX27fa4iFJJtZlRpA",
        {
          grant_type: "refresh_token",
          refresh_token: localStorage.getItem("refreshToken"),
        }
      )
      .then((result) => {
        //Localstorage-d hadgalah
        console.log("token==============>", result.data);
        const token = result.data.id_token;
        const userId = result.data.user_id;
        const expiresIn = result.data.expires_in;
        const expireDate = new Date(new Date().getTime() + expiresIn * 3600);
        const refreshToken = result.data.refresh_token;

        loginUserSuccess(token, userId, expireDate, refreshToken);
      })
      .catch((err) => {
        //console.log("err===========>", err.message);
        setState({
          ...state,
          loggingIn: false,
          error: err.message,
          errorCode: err.code,
          token: null,
          userId: null,
          expireDate: null,
        });
      });

    setTimeout(() => {
      //automataar garah
      //logout();
      //automataar dahin token shinechileh
      autoRenewTokenAfterMillisec(3600000);
    }, ms);
  };

  const loginUser = (email, password) => {
    setState({ ...state, loggingIn: true });
    const data = {
      email,
      password,
      returnSecureToken: true,
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAs1nt2Me2r-G-6_lEX27fa4iFJJtZlRpA",
        data
      )
      .then((result) => {
        //Localstorage-d hadgalah
        //console.log("Logged in ====================>", result.data);
        const token = result.data.idToken;
        const userId = result.data.localId;
        const expiresIn = result.data.expiresIn;
        const expireDate = new Date(new Date().getTime() + expiresIn * 3600);
        const refreshToken = result.data.refreshToken;

        loginUserSuccess(token, userId, expireDate, refreshToken);
        //dispatch(autoLogoutAfterMillisec(expiresIn * 1000));
        //dispatch(autoLogoutAfterMillisec(5000));
      })
      .catch((err) => {
        setState({
          ...state,
          loggingIn: false,
          error: err.message,
          errorCode: err.code,
          token: null,
          userId: null,
          expireDate: null,
        });
      });
  };

  const signupUser = (email, password) => {
    setState({ ...state, saving: true });

    const data = {
      email,
      password,
      returnSecureToken: true,
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAs1nt2Me2r-G-6_lEX27fa4iFJJtZlRpA",
        data
      )
      .then((result) => {
        //Localstorage-d hadgalah
        const token = result.data.idToken;
        const userId = result.data.localId;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        setState({
          ...state,
          saving: false,
          token,
          userId,
          error: null,
          errorCode: null,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          saving: false,
          token: null,
          userId: null,
          error: err.message,
          errorCode: err.code,
        });
      });
  };

  return (
    <UserContext.Provider
      value={{
        state,
        signupUser,
        loginUser,
        logout,
        loginUserSuccess,
        autoRenewTokenAfterMillisec,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
