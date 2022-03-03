import React, {Component, createContext} from 'react';

// Declaring the state object globally.
const initialState = {
    user: {
        access_token: '',
        data: {
            id: '',
            avatar: '',
            name: '',
            gender: '',
            email: '',
            phone: '',
            address: '',
            role: ''
        }
    }
};

const counterContextWrapper = (component?: Component) => ({
    ...initialState,
    setUser: (user: {access_token: ''; data: User}) => {
        initialState.user = user;
        component?.setState({context: counterContextWrapper(component)});
    },
    logoutUser: () => {
        initialState.user = initialState.user;
        component?.setState({context: counterContextWrapper(component)});
    }
});

type Context = ReturnType<typeof counterContextWrapper>;

export const CounterContext = createContext<Context>(counterContextWrapper());

interface State {
    context: Context;
}

export class CounterContextProvider extends Component {
    state: State = {
        context: counterContextWrapper(this)
    };

    render() {
        return (
            <CounterContext.Provider value={this.state.context}>
                {this.props.children}
            </CounterContext.Provider>
        );
    }
}
