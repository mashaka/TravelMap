import React from "react";
import { connect } from "react-redux";
import * as authActions from "../actions/authActions"
import { bindActionCreators } from "redux"
import ErrorView from "./ErrorView"
import LoginForm from "../components/LoginForm"
import { Link } from "react-router"

import "../styles/views/LoginView.scss"

@connect(
    (state) => ({
        isAuthenticating : state.auth.isAuthenticating,
        error: state.auth.errorWhileAuthenticating
    }),
    (dispatch) => ({
        actions: bindActionCreators( authActions, dispatch )
    })
)
export default class LoginView extends React.Component {

    constructor(props) {
        super(props);
        const redirectRoute = this.props.location.query.redirect || '/';
        this.state = {
            redirectTo: redirectRoute
        };
    }

    enter( login, password ) {
        this.props.actions.loginUser( login,
            password, this.state.redirectTo );
    }

    render() {
        return(
            <div className="login-card">
                <LoginForm login={this.login}
                           password={this.password}
                           loginCallback={this.enter.bind(this)}
                           isDisabled={this.props.isAuthenticating} />
                {this.props.error ?
                    <ErrorView /> : ''}
                <p>
                    Want to create new account? <Link className="blue-text text-lighten-3" to="/signup">Sign Up</Link>
                </p>
            </div>
        );
    }
}