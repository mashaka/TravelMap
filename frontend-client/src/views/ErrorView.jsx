import React from "react"
import { connect } from "react-redux"
import * as authActions from "../actions/authActions"

const {logout} = authActions;

@connect(
    state => state.errors
)
export default class ErrorView extends React.Component {

    componentWillReceiveProps(newProps) {
        // If user token is no longer valid, he is being logged out automatically
        if( newProps.respondCode === 1 || newProps.respondCode === 2 ) {
            this.props.dispatch( logout() );
        }
    }

    render() {
        // We use this to handle error without displaying props
        if (this.props.hideError) {
            return null;
        }
        return(
            <div>
                <p>Error!</p>
                <p>Respond status: {this.props.respondStatus}</p>
                <p>Respond code: {this.props.respondCode}</p>
                <p>Message: {this.props.respondMessage}</p>
            </div>
        );
    }
}