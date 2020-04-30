import React from 'react';
import { Alert, Form, Col, Row, Button } from "react-bootstrap";

import ProxyServices from '../../../Service/ProxyServices';

class CategoryForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			category: '',
			description: '',
			message: ''
		}

		this.onCategoryOnChange = this.onCategoryOnChange.bind(this);
		this.onSubmitBlog = this.onSubmitBlog.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
	}

	onCategoryOnChange(event) {
		this.setState({category: event.target.value});
	}

	onSubmitBlog(event) {
		if (this.state.title !== "" && this.state.category !== "" && this.state.content !== "") {
			let payload = {
				name: this.state.category,
				description: this.state.description,
			}

			ProxyServices.createCategory(payload)
				.then(response => response.data)
				.then((json) => {
					this.props.history.push("/category/list");
				}).catch(() => {

			})
		} else {
			this.setState({message: 'Please insert all required field'});
		}

	}

	onDescriptionChange(event) {
		this.setState({description: event.target.value});
	}

	render() {
		let alertMessage;
		if (this.state.message) {
			alertMessage = <Alert variant="danger">{this.state.message}</Alert>;
		}

		return(
			<div>
				{alertMessage}
				<div className="card">
					<div className="card-header">
						Create Post Category
					</div>
					<div className="card-body">
						<Form>
							<Form.Group as={Row} controlId="category">
								<Form.Label column md="2">
									Category Name
								</Form.Label>
								<Col md="10">
									<Form.Control type="text" name="category" id="category" onChange={this.onCategoryOnChange} placeholder="Category of Post"/>
								</Col>
							</Form.Group>
							<Form.Group as={Row} controlId="decription">
								<Form.Label column md="2">
									Description
								</Form.Label>
								<Col md="10">
									<Form.Control as="textarea" rows="5" name="description" id="description" onChange={this.onDescriptionChange} />
								</Col>
							</Form.Group>
							<div className="row float-right" style={{ paddingRight: '15px'}}>
								<Button id="createcategory" onClick={this.onSubmitBlog}>Create Category</Button>
							</div>
						</Form>
					</div>
				</div>
			</div>
		);
	}
}

export default CategoryForm;

