import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import AppStack from './navigation/AppStack';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppStack />
      </PaperProvider>
    </Provider>
  );
};

export default App;
