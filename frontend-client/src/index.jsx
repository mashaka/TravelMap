import React from 'react'
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import { browserHistory } from 'react-router';
import configureStore from './store/configureStore'
import { loginUserSuccess } from "./actions/authActions"
import "materialize-css/bin/materialize.css"
import "materialize-css/dist/js/materialize.min.js"

const target = document.createElement('div');
document.body.appendChild(target);

const { store, history } = configureStore(browserHistory, window.__INITIAL_STATE__);

if( localStorage["auth"] ) {
    const auth = JSON.parse(localStorage["auth"]);
    store.dispatch( loginUserSuccess( auth.token, auth.nickName ) );
}

const node = (
    <Root store={store} history={history} />
);

ReactDOM.render( node, target );