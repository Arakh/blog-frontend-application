import React from 'react'
import ProxyServices from "../../Service/ProxyServices";
import HeaderMenu from "../../components/HeaderMenu";

class Logout extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentDidMount() {
		ProxyServices.logout();
		let path = `/login`;
		this.props.history.push(path);
	}

	render() {
		return(
				<div>
					<HeaderMenu />
					<h1>logout</h1>
				</div>

		);
	}

}
export default Logout;
