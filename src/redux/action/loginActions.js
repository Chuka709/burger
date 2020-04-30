import axios from "axios";

export const loginUser = (email, password) => {
  return function (dispatch) {
    dispatch(loginUserStart());

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
        const token = result.data.idToken;
        const userId = result.data.localId;
        const expiresIn = result.data.expiresIn;
        const expireDate = new Date(new Date().getTime() + expiresIn * 3600);
        const refreshToken = result.data.refreshToken;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("expireDate", expireDate);
        localStorage.setItem("refreshToken", refreshToken);

        dispatch(loginUserSuccess(token, userId));
        dispatch(autoLogoutAfterMillisec(expiresIn * 1000));
        //dispatch(autoLogoutAfterMillisec(5000));
      })
      .catch((err) => {
        dispatch(loginUserError(err));
      });
  };
};
export const loginUserStart = () => {
  return {
    type: "LOGIN_USER_START",
  };
};
export const loginUserSuccess = (token, userId) => {
  return {
    type: "LOGIN_USER_SUCCESS",
    token,
    userId,
  };
};
export const loginUserError = (error) => {
  return {
    type: "LOGIN_USER_ERROR",
    error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expireDate");
  localStorage.removeItem("refreshToken");
  return {
    type: "LOGOUT",
  };
};

export const autoLogoutAfterMillisec = (ms) => {
  return function (dispatch) {
    //Token shinechleh code bichij bolno
    // axios
    //   .post(
    //     "https://securetoken.googleapis.com/v1/token?key=AIzaSyAs1nt2Me2r-G-6_lEX27fa4iFJJtZlRpA",
    //     {
    //       grant_type: "refresh_token",
    //       refresh_token: localStorage.getItem("refreshToken"),
    //     }
    //   )
    //   .then((result) => {
    //     //Localstorage-d hadgalah
    //     const token = result.data.id_token;
    //     const userId = result.data.user_id;
    //     const expiresIn = result.data.expires_in;
    //     const expireDate = new Date(new Date().getTime() + expiresIn * 3600);
    //     const refreshToken = result.data.refresh_token;

    //     localStorage.setItem("token", token);
    //     localStorage.setItem("userId", userId);
    //     localStorage.setItem("expireDate", expireDate);
    //     localStorage.setItem("refreshToken", refreshToken);

    //     dispatch(loginUserSuccess(token, userId));
    //   })
    //   .catch((err) => {
    //     dispatch(loginUserError(err));
    //   });
    //Automataar logout hiih command
    setTimeout(() => {
      dispatch(logout());
    }, ms);
  };
};
