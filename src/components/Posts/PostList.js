import React from 'react';
import ProxyServices from "../../Service/ProxyServices";
import queryString from 'query-string';
import { EditorState } from 'draft-js';
import { mediaBlockRenderer } from "../blog/MediaBlockrenderer";
import Pagination from 'react-js-pagination';
import { DropdownButton, Dropdown, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import PostThumbnail from "./PostThumbnail";
import ResultLabel from "./ResultLabel";

class PostList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			blogs: [],
			categories: [{'id': 0, name: 'All'}],
			keyword: '',
			category: '',
			editorState: EditorState.createEmpty(),
			activePage: 1,
			link: this.props.link
		}

		this.onSearchChange = this.onSearchChange.bind(this);
		this.onSubmitSearch = this.onSubmitSearch.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.getMyPosting = this.getMyPosting.bind(this);
		this.searchByUsernameAndKeyword = this.searchByUsernameAndKeyword.bind(this);
	}

	handlePageChange(pageNumber) {
		this.setState({activePage: pageNumber});

		if (this.props.source === "Home") {
			this.fetchBlogData("", pageNumber);
		} else if (this.props.source === "MyPost") {
			this.handlePageMyPost(pageNumber);
		}
	}

	handlePageMyPost(pageNumber) {
		if (this.state.keyword) {
			this.searchByUsernameAndKeyword(pageNumber-1, this.props.author, this.state.keyword);
		} else {
			this.getMyPosting(pageNumber-1, this.props.author, this.state.category);
		}
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

		if (this.props.source === "Home") {
			this.getBlogByKeyWord();
		} else if (this.props.source === "MyPost") {
			this.searchByUsernameAndKeyword(0, this.props.author, this.state.keyword);
		}
	}

	getBlogByKeyWord() {
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

	searchByUsernameAndKeyword(pageNumber, username, keyword) {
		ProxyServices.getPostingByUsernameAndKeyword(pageNumber, username, keyword)
			.then(response => response.data)
			.then((json) => {
				this.setState({blogs: json});
			}).catch(() => {
		})
	}

	getMyPosting(pageNumber, username, category) {
		ProxyServices.getPostingByUsername(pageNumber, username, category)
			.then(response => response.data)
			.then((json) => {
				this.setState({blogs: json});
			}).catch(() => {
		})
	}

	componentDidMount() {
		let params = queryString.parse(this.props.location.search);
		this.setState({category: params.category});

		ProxyServices.getCategoryList()
			.then(response => response.data)
			.then((json) => {
				this.setState({categories: [...this.state.categories, ...json]});
			}).catch(() => {
		})

		if (this.props.source === "Home") {
			this.fetchBlogData(params.category, 0);
		} else if (this.props.source === "MyPost") {
			this.getMyPosting(0, this.props.author, params.category);
		}
	}

	render() {
		return (
			<div>
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
					<ResultLabel category={this.state.category} keyword={this.state.keyword} author={this.props.author} />
				</div>
				<div id="data" className="row" style={{marginLeft:'30px', marginRight:'30px'}}>
					{this.state.blogs.map((data, i) => <PostThumbnail key = {i} data = {data} editor={this.state.editorState} onChange={this.onEditorChange} blockRendererFn={mediaBlockRenderer} plugins={this.plugins} />)}
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

export default PostList;


