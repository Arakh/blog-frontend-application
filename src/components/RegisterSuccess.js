import React from 'react';
import { Link } from 'react-router-dom';
import HeaderMenu from "../components/HeaderMenu";

class RegisterSuccess extends React.Component {

	constructor(props) {
		super(props);

	}

	render() {
		return(
			<div>
				<HeaderMenu />
				<div className="card">
					<div className="card-header"/>
						<div className="card-body">
							<h1 id="info">Please check your email to active your your account !!!! <Link to='/login'>Login</Link></h1>
						</div>
				</div>
			</div>
		);
	}

}

export default RegisterSuccess;
