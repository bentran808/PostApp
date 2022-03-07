/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';
import {AppContextProvider} from './src/navigation/AppContext';

AppRegistry.registerComponent(appName, () => () => (
    <AppContextProvider>
        <PaperProvider>
            <App />
        </PaperProvider>
    </AppContextProvider>
));
