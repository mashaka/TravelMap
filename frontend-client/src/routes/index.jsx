import React from "react";
import {Route, IndexRedirect } from "react-router";

import App from "../containers/App";
import LoginView from "../views/LoginView"
import SignUpView from "../views/SignUpView"
import MapView from "../views/MapView"
import SiteView from "../views/SiteView"
import UserProfileView from "../views/UserProfileView"

export default(
    <Route path="/" component={App}>
        <IndexRedirect to="login" />
        <Route component={SiteView}>
            <Route path="map" component={MapView} />
            <Route path="home" component={UserProfileView} />
        </Route>
        <Route path="login" component={LoginView} />
        <Route path="signup" component={SignUpView} />
    </Route>
);
