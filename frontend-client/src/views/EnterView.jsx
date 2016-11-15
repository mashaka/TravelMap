import React from "react";

import "../styles/views/EnterView.scss"

export default class EnterView extends React.Component {
    render() {
        return(
            <div className="enter-view-block">
                <p className="enter-view-greetings"> Welcome to Travel Map! </p>
                {this.props.children}
            </div>
        );
    }
}
