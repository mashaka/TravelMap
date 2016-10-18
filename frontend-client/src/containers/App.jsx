import React from 'react';
import ErrorView from "../views/ErrorView"

export default class App extends React.Component{

    render() {
        return (
            <div>
                {this.props.children}
                <ErrorView hideError={true} />
            </div>
        );
    }
}