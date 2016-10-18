import React from "react";
import { connect } from "react-redux";
import * as authActions from "../actions/authActions"
import { bindActionCreators } from 'redux'
import ErrorView from "./ErrorView"

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
                <h1> Registration form </h1>
                {this.props.statusText ? <p>{this.props.statusText}</p> : ''}
                <form type="submit">
                <div>
                    <input type="text" placeholder="NickName" ref={(input)=>this.nickname=input} />
                </div>
                <div>
                    <input type="text" placeholder="e-mail" ref={(input)=>this.email=input} />
                </div>
                <div>
                    <input type="password" placeholder="Password" ref={(input)=>this.password=input} />
                </div>
                <div>
                    <button type="submit"
                            disabled={this.props.pending}
                            onClick={this.register.bind(this)}>
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