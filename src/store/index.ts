import rootReducer from '@/reducers';
import {
  legacy_createStore as createStore,
  Store,
  applyMiddleware,
  type AnyAction,
} from 'redux';
// import { configureStore, combineReducers } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk';

function logger({getState}: any) {
  return (next: any) => (action: AnyAction) => {
    console.log('%c will dispatch: ', 'color: red;font-weight: bold', action);

    let returnValue = next(action);

    console.log(
      '%c state after dispath',
      'color: #28cd17;font-weight:bold',
      getState(),
    );

    return returnValue;
  };
}
function configureStore(preloadedState: any = undefined): Store {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, logger),
  );
}

export default configureStore();
