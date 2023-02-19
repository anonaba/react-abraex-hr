import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./pages/Loading";
import "./scss/style.scss";
import {
  ROUTE_LOGIN,
  ROUTE_REGISTRATION,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_HOME,
  ROUTE_NEW_PASSWORD,
} from "./Routes";

const Login = React.lazy(() => import("./pages/LoginPage"));
const Registration = React.lazy(() => import("./pages/Registration"));
const ForgotPassword = React.lazy(() => import("./pages/Forgot-Password"));
const Layout = React.lazy(() => import("./layout"));
const Home = React.lazy(() => import("./pages/HomePage"));
const CreateNewPassword = React.lazy(() => import("./pages/CreateNewPassword"));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path={ROUTE_FORGOT_PASSWORD} component={ForgotPassword} />
          <Route path={ROUTE_REGISTRATION} component={Registration} />
          <Route
            path={ROUTE_NEW_PASSWORD}
            exact
            component={CreateNewPassword}
          />
          <Route path={ROUTE_LOGIN} component={Login} />
          <Route path={ROUTE_HOME} exact component={Home} />

          <Route path="/" component={Layout} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
