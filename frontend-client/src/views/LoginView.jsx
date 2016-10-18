import React from "react";
import { connect } from "react-redux";
import * as authActions from "../actions/authActions"
import { bindActionCreators } from 'redux'
import ErrorView from "./ErrorView"

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
                <h1> Login form </h1>
                {this.props.statusText ? <p>{this.props.statusText}</p> : ''}
                <form type="submit">
                <div>
                    <input type="text" placeholder="Login" ref={(input)=>this.login=input} />
                </div>
                <div>
                    <input type="password" placeholder="Password" ref={(input)=>this.password=input} />
                </div>
                <div>
                    <button type="submit"
                            disabled={this.props.isAuthenticating}
                            onClick={this.enter.bind(this)}>
                        Enter
                    </button>
                </div>
                </form>
                {this.props.error ?
                    <ErrorView /> : ''}
            </div>
        );
    }
}