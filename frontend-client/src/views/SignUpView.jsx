import React from "react";
import { connect } from "react-redux";
import * as authActions from "../actions/authActions"
import * as formActions from "../actions/signupActions"
import { bindActionCreators } from "redux"
import ErrorView from "./ErrorView"
import SignUpForm from "../components/SignUpForm"
import { Link } from "react-router"

import "../styles/views/SignUpView.scss"

@connect(
    (state) => ({
        pending : state.auth.isAuthenticating,
        error: state.auth.errorWhileAuthenticating,
        gender: state.signup.gender,
        birthDate: state.signup.birthdate
    }),
    (dispatch) => ({
        actions: bindActionCreators( authActions, dispatch ),
        formActions: bindActionCreators( formActions, dispatch ),
    })
)
export default class SignUpView extends React.Component {

    register( nickname, email, password, locale, gender, birthday, birthmoth, birthyear ) {
        this.props.actions.signUpUser( nickname, email, password, locale, gender, birthday, birthmoth, birthyear );
    }

    render() {
        return(
            <div className="signup-card">
                <SignUpForm gender={this.props.gender}
                            birthDate={this.props.birthDate}
                            chooseGender={this.props.formActions.chooseGender}
                            chooseBirthDate={this.props.formActions.chooseBirthDate}
                            registrationCallBack ={this.register.bind(this)}
                            pending={this.props.pending}/>
                {this.props.error ?
                    <ErrorView /> : ''}
                <p>Already have an account? <Link className="blue-text text-lighten-3" to="/login">Login</Link> </p>
            </div>
        );
    }
}