import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import routes from '../routes';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import createLogger from 'redux-logger';
import { syncHistory } from 'react-router-redux'

export default function configureStore(baseHistory, initialState) {
    const routingMiddleware = routerMiddleware(baseHistory);

    const logger = createLogger();

    const middleware = applyMiddleware(routingMiddleware, thunk, logger);

    const store = createStore(
        rootReducer,
        initialState,
        middleware
    );

    const history = syncHistoryWithStore(baseHistory, store);

    if (module.hot) {
        module.hot
            .accept('../reducers', () => {
                const nextRootReducer = require('../reducers/index');
                store.replaceReducer(nextRootReducer);
            });
    }

    return { store, history };

}