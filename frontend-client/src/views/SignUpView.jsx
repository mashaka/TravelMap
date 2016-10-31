import React from "react";
import { connect } from "react-redux";
import * as authActions from "../actions/authActions"
import { bindActionCreators } from 'redux'
import ErrorView from "./ErrorView"
import SignUpForm from "../components/SignUpForm"

@connect(
    (state) => ({
        pending : state.auth.isAuthenticating,
        error: state.auth.errorWhileAuthenticating
    }),
    (dispatch) => ({
        actions: bindActionCreators( authActions, dispatch )
    })
)
export default class SignUpView extends React.Component {

    register(e) {
        e.preventDefault();
        this.props.actions.signUpUser( this.nickname.value, this.email.value,
            this.password.value );
        this.nickname.value ='';
        this.email.value = '';
        this.password.value = '';
    }

    render() {
        return(
            <div>
                <SignUpForm nickname ={this.nickname}
                            email ={this.email}
                            password ={this.password}
                            registrationCallBack ={this.register.bind(this)}
                            pending={this.props.pending}/>
                {this.props.error ?
                    <ErrorView /> : ''}
            </div>
        );
    }
}