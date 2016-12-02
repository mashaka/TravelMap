import React from "react";
import {Route, IndexRedirect } from "react-router";

import App from "../containers/App";
import LoginView from "../views/LoginView"
import SignUpView from "../views/SignUpView"
import MapView from "../views/MapView"
import SiteView from "../views/SiteView"
import UserProfileView from "../views/UserProfileView"
import EnterView from "../views/EnterView"

export default(
    <Route path="/" component={App}>
        <IndexRedirect to="home" />
        <Route component={SiteView}>
            <Route path="map" component={MapView} />
            <Route path="home" component={UserProfileView} />
        </Route>
        <Route component={EnterView} >
            <Route path="login" component={LoginView} />
            <Route path="signup" component={SignUpView} />
        </Route>
    </Route>
);
