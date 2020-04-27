import React from 'react';
import ProxyServices from '../../Service/ProxyServices';

class Main extends React.Component {

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
		if (this.state.title != "" && this.state.category !== "" && this.state.content !== "") {
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
			this.setState({message: 'please insert all required field'});
		}

	}

	onDescriptionChange(event) {
		this.setState({description: event.target.value});
	}

	render() {

		let data = this.state.categories;

		return(
			<div className="card">
				<div className="card-header">
					CREATE BLOG CATEGORY [{this.state.message}]
				</div>
				<div className="card-body">
					<div className="row">
						<div className="col-md-1">
							Category Name:
						</div>
						<div className="col-md-7" style={{marginLeft:'0px'}}>
							<input type="text" name="category" id="category" onChange={this.onCategoryOnChange} placeholder="Please insert the blog category..." size="50"/>
						</div>
						<div className="col-md-4" style={{marginLeft:'0px'}}>
						</div>
					</div>
					<div className="row" style={{marginTop:'20px'}}>
						<div className="col-md-1">
							Description:
						</div>
						<div className="col-md-7" style={{marginLeft:'0px'}}>
							<textarea rows = "10" cols = "120" name = "description" id="description" onChange={this.onDescriptionChange}>
							</textarea>
						</div>
						<div className="col-md-4" style={{marginLeft:'0px'}}>
						</div>
					</div>
					<div className="row" style={{marginTop:'20px'}}>
						<div className="col-md-1">
						</div>
						<div className="col-md-7" style={{marginLeft:'0px'}}>
							<button id="createcategory" className="btn btn btn-primary" onClick={this.onSubmitBlog}>Create Category</button>
						</div>
						<div className="col-md-4" style={{marginLeft:'0px'}}>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Main;

