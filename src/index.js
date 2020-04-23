import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from './store'
import * as serviceWorker from './serviceWorker';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const store = Store();

const options = {
	timeout: 5000,
	position: positions.TOP_CENTER,
	width: '500px',
};

const Root = () => (
	<Provider template={AlertTemplate} {...options}>
		<App store={store}/>
	</Provider>
)

ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
/*ReactDOM.render(<App/>, document.getElementById('root'));*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
