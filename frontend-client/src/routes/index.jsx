import React from "react";
import {Route, IndexRedirect } from "react-router";

import App from "../containers/App";
import LoginView from "../views/LoginView"
import SignUpView from "../views/SignUpView"
import MapView from "../views/MapView"

export default(
    <Route path="/" component={App}>
        <IndexRedirect to="login" />
        <Route path="login" component={LoginView} />
        <Route path="signup" component={SignUpView} />
        <Route path="map" component={MapView} />
        <Route path="home" />
    </Route>
);
