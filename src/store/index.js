import {createStore, compose, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import reducer from "./reducer";
import storage from 'redux-persist/lib/storage'
import {persistStore, persistReducer} from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['']
}

const persistedReducer = persistReducer(persistConfig, reducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(persistedReducer, composeEnhancers(
    applyMiddleware(thunk),
));
export const persistor = persistStore(store)
