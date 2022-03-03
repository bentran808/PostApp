/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';
import {CounterContextProvider} from './src/navigation/CounterContext';

AppRegistry.registerComponent(appName, () => () => (
    <CounterContextProvider>
        <PaperProvider>
            <App />
        </PaperProvider>
    </CounterContextProvider>
));
