import React, { useState, useEffect, Suspense, useContext } from "react";
import { Redirect } from "react-router-dom";
import css from "./style.module.css";

import Toolbar from "../../components/Toolbar";
import SideBar from "../../components/SideBar";
import { Route, Switch } from "react-router-dom";
import ShippingPage from "../ShippingPage";
import LoginPage from "../LoginPage";
import Logout from "../../components/Logout";

import { BurgerStore } from "../../context/BurgerContext";
import { OrderStore } from "../../context/OrdersContext";
import UserContext from "../../context/UserContext";

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
  const userCtx = useContext(UserContext);
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
        userCtx.loginUserSuccess(token, userId, expireDate, refreshToken);
        // Token huchingui bolohod uldej bga hugatsaag tootsoolj ter hugatsaanii daraa autmataar logout hiine
        userCtx.autoRenewTokenAfterMillisec(
          expireDate.getTime() - new Date().getTime()
        );
      } else {
        //Token hugatsaa duussan
        //userCtx.logout();
        userCtx.autoRenewTokenAfterMillisec(3600000);
      }
    }
  }, []);

  return (
    <div>
      <Toolbar toggleSideBar={toggleSideBar} />
      <SideBar showSideBar={showSideBar} toggleSideBar={toggleSideBar} />
      <main className={css.Content}>
        <BurgerStore>
          <Suspense fallback={<div>Түр хүлээнэ үү...</div>}>
            {userCtx.state.userId ? (
              <Switch>
                <Route path="/logout" component={Logout} />
                <Route path="/orders">
                  <OrderStore>
                    <OrderPage />
                  </OrderStore>
                </Route>

                <Route path="/ship" component={ShippingPage} />
                <Route path="/" component={BurgerPage} />
              </Switch>
            ) : (
              <Switch>
                <Route path="/signup" component={SignupPage} />
                <Route path="/login" component={LoginPage} />
                <Redirect to="/login" />
              </Switch>
            )}
          </Suspense>
        </BurgerStore>
      </main>
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     autoLogin: (token, userId) =>
//       dispatch(actions.loginUserSuccess(token, userId)),
//     logout: () => {
//       actions.logout();
//     },
//     autoLogoutAfterMillisec: (ms) => {
//       actions.autoLogoutAfterMillisec(ms);
//     },
//   };
// };

export default App;
