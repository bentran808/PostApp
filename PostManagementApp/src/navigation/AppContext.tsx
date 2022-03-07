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

const appContextWrapper = (component?: Component) => ({
    ...initialState,
    setUser: (user: {access_token: ''; data: User}) => {
        initialState.user = user;
        component?.setState({context: appContextWrapper(component)});
    },
    logoutUser: () => {
        initialState.user = initialState.user;
        component?.setState({context: appContextWrapper(component)});
    }
});

type Context = ReturnType<typeof appContextWrapper>;

export const AppContext = createContext<Context>(appContextWrapper());

interface State {
    context: Context;
}

export class AppContextProvider extends Component {
    state: State = {
        context: appContextWrapper(this)
    };

    render() {
        return (
            <AppContext.Provider value={this.state.context}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}
