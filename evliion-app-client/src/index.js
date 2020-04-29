import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore,combineReducers,applyMiddleware,compose } from 'redux';
import loggedReducer from './store/reducers/loggedUserReducer';
import thunk from 'redux-thunk';

const rootReducers = combineReducers({
    loggedUser: loggedReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducers,composeEnhancers(
    applyMiddleware(thunk)
));
ReactDOM.render(
   <Provider store={store}>
       <Router>
           <App />
       </Router>
   </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
