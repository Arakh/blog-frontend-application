import React from 'react';
import { Link } from 'react-router-dom';
import AuthenticationService from "../Service/ProxyServices";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { withAlert } from 'react-alert'
import HeaderMenu from "../components/HeaderMenu";

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
					const remainUsers = this.state.users.filter(user => user.username != username);
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
									<th>USERNAME</th>
									<th>EMAIL</th>
									<th>ROLE</th>
									<th>STATUS</th>
									<th></th>
									<th></th>
								</tr>
								{this.state.users.map((data, i) => <TableRow key = {i} data = {data} onDeleteConfirmation = {this.onDeleteConfirmation} />)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

const TableRow = (props) => {

	return (
		<tr>
			<td>{props.data.username}</td>
			<td>{props.data.email}</td>
			<td>{props.data.roles}</td>
			<td>{JSON.stringify(props.data.enabled)}</td>
			<td><Link to={'/user/edit/'+props.data.username} className="btn btn-info" >Edit</Link></td>
			<td><button className="btn btn-info" onClick={() => props.onDeleteConfirmation(props.data.username)}>Delete</button></td>
		</tr>
	);
}

export default withAlert()(UserList);
