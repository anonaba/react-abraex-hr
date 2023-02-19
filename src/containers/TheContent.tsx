import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";
import { routes } from "../Routes";
import Cookies from "universal-cookie";

const TheContent = () => {
  const cookies = new Cookies();
  var token = cookies.get("token");
  if (!token) {
    cookies.remove("token", { path: "/" });
    window.parent.location = '/login';
  }
  return (
    <main className="c-main">
      <CContainer fluid>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    
                    render={(props: any) => (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    )}
                  />
                )
              );
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
