import React from 'react';
import { Table } from 'react-bootstrap';

import AuthenticationService from "../../Service/ProxyServices";
import HeaderMenu from "../../components/HeaderMenu";
import CategoryRow from "./Components/CategoryRow";

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
				<div className="row justify-content-md-center" style={{marginTop:'50px'}}>
					<div className="col-md-6">
						<center><h3>Category List</h3></center>
						<Table striped bordered hover>
							<thead>
							<tr>
								<th width="5%">#</th>
								<th>Name</th>
								<th>Description</th>
								<th width="20%">Action</th>
							</tr>
							</thead>
							<tbody>
								{this.state.categories.map((data, i) => <CategoryRow key = {i} data = {data} />)}
							</tbody>
						</Table>
					</div>
				</div>
			</div>
		);
	}

}

export default CategoryList;
