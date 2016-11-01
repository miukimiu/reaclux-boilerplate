import React from 'react';
import ReactDOM from "react-dom";
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, push } from 'react-router-redux';
import routes from './routes';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

// include the stylesheet entry point
require('../sass/app.scss');

const middlewares = [thunk, routerMiddleware(browserHistory)];

if (process.env.NODE_ENV === 'development') {
	const createLogger = require('redux-logger');
	const logger = createLogger();
	middlewares.push(logger);
}

const store = createStore(
	reducers,
	compose(applyMiddleware(...middlewares))
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={ store }>
		<Router history={ history } routes={ routes } />
	</Provider>,
	document.getElementById('app')
);
