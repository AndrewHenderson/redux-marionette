import { compose, createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'

import {marionetteMiddleware} from '../../marionette-redux.js';

export default function configureStore(initialState) {
  const store = compose(
    applyMiddleware(marionetteMiddleware(window.Backbone, window.Backbone.Marionette, window._))
  )(createStore)(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
