import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { persistentStore } from 'redux-pouchdb';
import { PouchDB } from 'pouchdb';

const db = new PouchDB('minotaur');
/*
const createStoreWithMiddleware = compose(
    applyMiddlewares,
    persistentStore(db)
  )(createStore);
  */
// Note: this API requires redux@>=3.1.0
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);