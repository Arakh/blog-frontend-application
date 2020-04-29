import React from 'react';
import ProxyServices from "../../Service/ProxyServices";
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { EditorState } from 'draft-js';
import { mediaBlockRenderer } from "../../components/blog/MediaBlockrenderer";
import Pagination from 'react-js-pagination';
import { DropdownButton, Dropdown, Alert, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import HeaderMenu from "../../components/HeaderMenu";
import BlogData from "./BlogData";
import ResultLabel from "./ResultLabel";

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			blogs: [],
			categories: [{'id': 0, name: 'All'}],
			keyword: '',
			selectedCategory: '',
			editorState: EditorState.createEmpty(),
			activePage: 1,
			link: '/home?category='
		}

		this.onSearchChange = this.onSearchChange.bind(this);
		this.onSubmitSearch = this.onSubmitSearch.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
	}

	handlePageChange(pageNumber) {
		this.setState({activePage: pageNumber});

		this.fetchBlogData("", pageNumber)
	}

	onChange = (editorState) => {
		this.setState({
			editorState,
		});
	};

	focus = () => {
		this.editor.focus();
	};

	onSearchChange(event) {
		this.setState({keyword: event.target.value});
	}

	onSubmitSearch(event) {
		event.preventDefault();

		ProxyServices.getBlogByKeyWord(this.state.keyword)
			.then(response => response.data)
			.then((json) => {
				this.setState({blogs: json});
			}).catch(() => {
		})
	}

	fetchBlogData(category, page) {
		if (category) {
			ProxyServices.getBlogList(category, page-1)
				.then(response => response.data)
				.then((json) => {
					this.setState({blogs: json});
				}).catch(() => {
			})
		} else {
			ProxyServices.getBlogList("", page-1)
				.then(response => response.data)
				.then((json) => {
					this.setState({blogs: json});
				}).catch(() => {
			})
		}
	}

	componentDidMount() {
		this.setState({selectedCategory: queryString.parse(this.props.location.search).category});
		this.fetchBlogData(this.state.selectedCategory, 0);

		ProxyServices.getCategoryList()
			.then(response => response.data)
			.then((json) => {
				this.setState({categories: [...this.state.categories, ...json]});
			}).catch(() => {
		})
	}

	render() {
		return (
			<div>
				<HeaderMenu/>
				<div className="row" style={{marginLeft:'20px', marginRight:'20px', marginTop:'10px'}}>
					<div className="col-md-12">
						<Navbar expand="md" bg="light" variant="light">
							<Navbar.Toggle aria-controls="responsive-navbar-filter" />
							<Navbar.Collapse id="responsive-navbar-filter">
								<Nav className="mr-auto">
									<Nav>
										<DropdownButton id="dropdownMenuButton" title="Category">
										{this.state.categories.map((data, i) =>
											<Dropdown.Item key={data.id} href={this.state.link + data.name}>{data.name}</Dropdown.Item>
										)}
										</DropdownButton>
									</Nav>
								</Nav>
								<Form inline>
									<FormControl className="form-control mr-sm-2" type="search" placeholder="Search"
										aria-label="Search" onChange={this.onSearchChange}/>
									<Button variant="success" type="submit" onClick={this.onSubmitSearch}>Search</Button>
								</Form>
							</Navbar.Collapse>
						</Navbar>
					</div>
				</div>
				<div className="row justify-content-md-center" style={{marginLeft:'30px', marginRight:'30px'}}>
					<ResultLabel category={this.state.selectedCategory} keyword={this.state.keyword} />
				</div>
				<div id="data" className="row" style={{marginLeft:'30px', marginRight:'30px'}}>
					{this.state.blogs.map((data, i) => <BlogData key = {i} data = {data} editor={this.state.editorState} onChange={this.onEditorChange} blockRendererFn={mediaBlockRenderer} plugins={this.plugins} />)}
				</div>
				{/* <div className="row justify-content-md-center" style={{marginLeft:'30px', marginRight:'30px'}}>
					<Pagination
						activePage={this.state.activePage}
						itemsCountPerPage={10}
						totalItemsCount={450}
						pageRangeDisplayed={5}
						onChange={this.handlePageChange}
						itemClass="page-item"
						linkClass="page-link"
					/>
				</div> */}
			</div>
		)
	}
}

export default withRouter(Home);


