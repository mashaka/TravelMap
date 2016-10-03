import React from 'react';
import routes from '../routes';
import {Router} from 'react-router';
import {Provider} from 'react-redux';

export default class Root extends React.Component{

    render() {
        return (
            <div>
                <Provider store={this.props.store}>
                    <Router history={this.props.history}>
                        {routes}
                    </Router>
                </Provider>
            </div>
        );
    }
}