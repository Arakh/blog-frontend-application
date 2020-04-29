import React from 'react';
import { Link } from 'react-router-dom';
import AuthenticationService from "../../Service/ProxyServices";
import HeaderMenu from "../../components/HeaderMenu";

class CategoryList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			categories : [],
		}
	}


	componentDidMount() {
		AuthenticationService.getCategoryList()
			.then(response => response.data)
			.then((json)=>{
				this.setState({categories: json})
			});
	}

	render() {
		return(
			<div>
				<HeaderMenu />
				<div className="container" style={{marginTop:'100px'}}>
					<div className="row">
						<div className="card">
							<table id="categorylist" className="table table-striped">
								<tbody>
								<tr>
									<th>ID</th>
									<th>NAME</th>
									<th>DESCRIPTION</th>
									<th></th>
									<th></th>
								</tr>
								{this.state.categories.map((data, i) => <TableRow key = {i} data = {data} />)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

class TableRow extends React.Component {
	render() {
		return (
			<tr>
				<td>{this.props.data.id}</td>
				<td>{this.props.data.name}</td>
				<td>{this.props.data.description}</td>
				<td><Link to={'/category/edit/'+this.props.data.id} className="btn btn-info" >Edit</Link></td>
				<td><Link to={'/category/delete/'+this.props.data.delete} className="btn btn-info">Delete</Link></td>
			</tr>
		);
	}
}

export default CategoryList;
