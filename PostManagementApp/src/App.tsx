import React from 'react';
import { AppContextProvider } from './navigation/AppContext';
import AppStack from './navigation/AppStack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
    return (
        <Provider store={store}>
            <AppContextProvider>
                <PaperProvider>
                    <AppStack />
                </PaperProvider>
            </AppContextProvider>
        </Provider>
    );
};

export default App;
