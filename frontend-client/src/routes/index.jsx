import React from "react";
import {Route, IndexRedirect } from "react-router"

import App from "../containers/App"
import LoginView from "../views/LoginView"
import SignUpView from "../views/SignUpView"
import MyMapView from "../views/MyMapView"
import SharedMapView from "../views/SharedMapView"
import SiteView from "../views/SiteView"
import UserProfileView from "../views/UserProfileView"
import EnterView from "../views/EnterView"
import { requireAuthentication } from "../utils/requireAuthentication"

export default(
    <Route path="/" component={App}>
        <IndexRedirect to="home" />
        <Route component={requireAuthentication(SiteView)}>
            <Route path="my-map" component={MyMapView} />
            <Route path="shared-map" component={SharedMapView} />
            <Route path="home" component={UserProfileView} />
        </Route>
        <Route component={EnterView} >
            <Route path="login" component={LoginView} />
            <Route path="signup" component={SignUpView} />
        </Route>
    </Route>
);
