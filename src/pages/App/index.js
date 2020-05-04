import React, { useState, useEffect, Suspense } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import css from "./style.module.css";

import Toolbar from "../../components/Toolbar";
import SideBar from "../../components/SideBar";
import { Route, Switch } from "react-router-dom";
import ShippingPage from "../ShippingPage";
import LoginPage from "../LoginPage";
import Logout from "../../components/Logout";

import * as actions from "../../redux/action/loginActions";

import { BurgerStore } from "../../context/BurgerContext";

//Lazy loading hiih buyu edgeer huudsuudiig shaardlagatai uyd ni l duudna. Suspense ashiglana
const BurgerPage = React.lazy(() => {
  return import("../BurgerPage");
});
const SignupPage = React.lazy(() => {
  return import("../SignupPage");
});
const OrderPage = React.lazy(() => {
  return import("../OrderPage");
});

const App = (props) => {
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSideBar = () => {
    setShowSideBar((prevShowSideBar) => !prevShowSideBar);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = new Date(localStorage.getItem("expireDate"));
    const refreshToken = localStorage.getItem("refreshToken");
    if (token) {
      if (expireDate > new Date()) {
        props.autoLogin(token, userId);
      } else {
        //Token hugatsaa duussan
        props.logout();
        // Token huchingui bolohod uldej bga hugatsaag tootsoolj ter hugatsaanii daraa autmataar logout hiine
        props.autoLogoutAfterMillisec(
          expireDate.getTime() - new Date().getTime()
        );
      }
    }
  }, []);

  return (
    <div>
      <Toolbar toggleSideBar={toggleSideBar} />
      <SideBar showSideBar={showSideBar} toggleSideBar={toggleSideBar} />
      <main className={css.Content}>
        <Suspense fallback={<div>Түр хүлээнэ үү...</div>}>
          {props.userId ? (
            <Switch>
              <Route path="/logout" component={Logout} />
              <Route path="/orders" component={OrderPage} />
              <BurgerStore>
                <Route path="/ship" component={ShippingPage} />
                <Route path="/" component={BurgerPage} />
              </BurgerStore>
            </Switch>
          ) : (
            <Switch>
              <Route path="/signup" component={SignupPage} />
              <Route path="/login" component={LoginPage} />
              <Redirect to="/login" />
            </Switch>
          )}
        </Suspense>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.signupReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: (token, userId) =>
      dispatch(actions.loginUserSuccess(token, userId)),
    logout: () => {
      actions.logout();
    },
    autoLogoutAfterMillisec: (ms) => {
      actions.autoLogoutAfterMillisec(ms);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
