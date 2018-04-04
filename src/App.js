import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage';

import reducers from './reducers';
import TodoListContainer from './containers/TodoListContainer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });

const store = createStore(persistedReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const persistor = persistStore(store);

export default class App extends Component<Props> {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TodoListContainer />
        </PersistGate>
      </Provider>
    );
  }
}


