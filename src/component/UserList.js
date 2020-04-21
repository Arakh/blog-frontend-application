import React from 'react';
import { Link } from 'react-router-dom';
import AuthenticationService from "../Service/ProxyServices";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class UserList extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			users : [],
		}
	}

	componentDidMount(){
		console.log('Component DID MOUNT!');
		console.log("Username:", localStorage.getItem("authenticatedUser"));
		AuthenticationService.getUserList()
			.then(response => response.data)
			.then((json)=>{
				console.log("Response User List:", JSON.stringify(json.data.data));
				this.setState({users: json.data.data})
			}).catch((error)=>{
				console.log("Error:", error);
		});
	}

	render() {
		return(
			<div className="container" style={{marginTop:'100px'}}>
				<div>
					<div className="card">
						<table className="table table-striped">
							<tbody>
							<tr>
								<th>USERNAME</th>
								{/*<th>PASSWORD</th>*/}
								<th>EMAIL</th>
								<th>ROLE</th>
								<th>STATUS</th>
								<th></th>
								<th></th>
							</tr>
							{this.state.users.map((data, i) => <TableRow key = {i} data = {data} />)}
							{console.log(this.state.users)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}

}

class TableRow extends React.Component{

	deleteConfirmation = () => {
		confirmAlert({
		  title: 'Confirm to delete',
		  message: 'Are you sure want to delete this?',
		  buttons: [
			{
			  label: 'Yes',
			  onClick: () => alert('Click Yes')
			},
			{
			  label: 'No',
			  onClick: () => alert('Click No')
			}
		  ]
		});
	  };

	  render() {
		return (
			<tr>
				<td>{this.props.data.username}</td>
				{/*<td>{this.props.data.password}</td>*/}
				<td>{this.props.data.email}</td>
				<td>{this.props.data.roles}</td>
				<td>{JSON.stringify(this.props.data.enabled)}</td>
				<td><Link to={'/user/edit/'+this.props.data.username} className="btn btn-info" >Edit</Link></td>
				<td><button className="btn btn-info" onClick={this.deleteConfirmation}>Delete</button></td>
			</tr>
		);
	}
}

export default UserList;
