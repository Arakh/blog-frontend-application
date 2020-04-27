import React from 'react';
import {Provider} from 'react-redux'
import './App.css';
import MainContent from "./containers/MainContent";

class App extends React.Component
{

    render()
    {
        const {store} = this.props;

        return (
            <div>
                <Provider store={store}>
                    <MainContent/>
                </Provider>
            </div>
        )
    }
}

export default App;
