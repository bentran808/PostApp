import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import authReducer from '../redux/slices/authSlice';
import postReducer from '../redux/slices/postSlices';

const sagaMiddleware = createSagaMiddleware();
const AllTheProviders = ({ children }) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      post: postReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      }).concat(sagaMiddleware)
  });
  return (
    <Provider store={store}>
      <PaperProvider>{children}</PaperProvider>
    </Provider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
