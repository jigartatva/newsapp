import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import AppNavigator from "./modules/Navigation/NavigationView";

const store = configureStore();

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        );
    }
}

