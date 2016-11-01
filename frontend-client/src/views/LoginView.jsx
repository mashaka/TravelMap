import React from "react";
import { connect } from "react-redux";
import * as authActions from "../actions/authActions"
import { bindActionCreators } from "redux"
import ErrorView from "./ErrorView"
import LoginForm from "../components/LoginForm"

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

    enter(e) {
        e.preventDefault();
        this.props.actions.loginUser(this.login.value,
            this.password.value, this.state.redirectTo);
        this.login.value ='';
        this.password.value = '';
    }

    render() {
        return(
            <div>
                <LoginForm login={this.login}
                           password={this.password}
                           loginCallback={this.enter.bind(this)}
                           isDisabled={this.props.isAuthenticating} />
                {this.props.error ?
                    <ErrorView /> : ''}
            </div>
        );
    }
}