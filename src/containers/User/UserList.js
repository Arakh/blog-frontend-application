import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import AuthenticationService from "../../Service/ProxyServices";
import { withAlert } from 'react-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';

import HeaderMenu from "../../components/HeaderMenu";
import UserRow from "./Components/UserRow";

class UserList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			users : [],
		}

		this.onDeleteConfirmation = this.onDeleteConfirmation.bind(this);

	}

	onDeleteConfirmation(username) {

		confirmAlert({
			title: 'Confirm to delete',
			message: 'Are you sure want to delete '+username+'?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => this.deleteUser(username),
				},
				{
					label: 'No',
				}
		  	]
		});
	};

	deleteUser(username) {
		const alert = this.props.alert;

		AuthenticationService.deleteUser(username)
			.then(response => response.data)
			.then((json) => {
				if (json.data.success) {
					const remainUsers = this.state.users.filter(user => user.username !==username);
					this.setState({users: remainUsers});
					alert.success(json.data.message);
				} else {
					alert.error(json.data.message);
				}
			}).catch((error) => {
				alert.error(error.message);
			});
	};

	componentDidMount() {
		AuthenticationService.getUserList()
			.then(response => response.data)
			.then((json)=>{
				this.setState({users: json.data.data})
			}).catch((error)=>{
				console.log("Error:", error);
		});
	}

	render() {
		return(
			<div>
				<HeaderMenu />
				<div className="container" style={{marginTop:'100px'}}>
					<div>
						<div className="card">
							<table className="table table-striped">
								<tbody>
								<tr>
									<th>Username</th>
									<th>Emal</th>
									<th>Role</th>
									<th>Status</th>
									<th>Action</th>
								</tr>
								{this.state.users.map((data, i) => <UserRow key = {i} data = {data} onDeleteConfirmation = {this.onDeleteConfirmation} />)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default withAlert()(UserList);
