import React from "react"
import { connect } from "react-redux"
import * as authActions from "../actions/authActions"

const {logout} = authActions;

@connect(
    state => state.errors
)
export default class ErrorView extends React.Component {

    componentWillReceiveProps(newProps) {
        // handling specific situations
    }

    render() {
        // We use this to handle error without displaying props
        if (this.props.hideError) {
            return null;
        }
        return(
            <div className="error-message-block">
                {this.props.message}
            </div>
        );
    }
}