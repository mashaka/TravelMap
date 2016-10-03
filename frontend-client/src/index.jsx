import React from 'react'
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import { browserHistory } from 'react-router';
import configureStore from './store/configureStore'

const target = document.createElement('div');
document.body.appendChild(target);

const { store, history } = configureStore(browserHistory, window.__INITIAL_STATE__);

const node = (
    <Root store={store} history={history} />
);

ReactDOM.render( node, target );