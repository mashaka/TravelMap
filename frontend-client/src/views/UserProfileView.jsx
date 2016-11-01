import React from "react"
import { connect } from "react-redux"
import * as userActions from "../actions/userActions"
import { bindActionCreators } from "redux"
import UserInfo from "../components/UserInfo"
import ChangePasswordForm from "../components/ChangePasswordForm"
import ChangeEmailForm from "../components/ChangeEmailForm"

@connect(
    (state) => ({
        user: state.user,
        token: state.auth.token,
        name: state.auth.nickName
    }),
    (dispatch) => ({
        actions: bindActionCreators( userActions, dispatch )
    })
)
export default class UserProfileView extends React.Component {

    loadUserInfo() {
        this.props.actions.loadUserInfo( this.props.token );
    }

    resetState() {
        this.props.actions.resetState();
    }

    changePassword( oldPassword, newPassword ) {
        this.props.actions.changePassword( this.props.token, oldPassword, newPassword );
    }

    changeEmail( newEmail ) {
        this.props.actions.changeEmail( this.props.token, newEmail );
    }

    render() {
        return(
            <div>
                <UserInfo userName={this.props.name}
                          {...this.props.user} />
                <ChangeEmailForm changeEmailCallback={this.changeEmail.bind(this)}
                          {...this.props.user}/>
                <ChangePasswordForm changePasswordCallback={this.changePassword.bind(this)}
                          {...this.props.user}/>
            </div>
        );
    }
}
