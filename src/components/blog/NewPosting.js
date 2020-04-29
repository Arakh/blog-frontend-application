import React from 'react';
import Dropdown from "../dropdownmenu/CategoryDropdown";
import ProxyServices from "../../Service/ProxyServices";
import { EditorState, RichUtils, AtomicBlockUtils, convertFromRaw } from 'draft-js';
import { mediaBlockRenderer } from "../MediaBlockRenderer";
import Pagination from 'react-js-pagination';
import HeaderMenu from "../HeaderMenu";

class NewPosting extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			blogs: [],
			keyword: '',
			editorState: EditorState.createEmpty(),
			activePage: 1
		}
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onSubmitSearch = this.onSubmitSearch.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.getTodayPosting = this.getTodayPosting.bind(this);
	}

	handlePageChange(pageNumber) {
		this.setState({activePage: pageNumber});
		this.getTodayPosting(pageNumber);

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

	componentDidMount() {
		this.getTodayPosting(1);
	}

	getTodayPosting(pageNumber) {
		ProxyServices.getTodayPosting(pageNumber)
			.then(response => response.data)
			.then((json) => {
				this.setState({blogs: json});
			}).catch(() => {
		})
	}

	componentWillReceiveProps(nextProps, nextContext) {
		ProxyServices.getTodayPosting()
			.then(response => response.data)
			.then((json) => {
				this.setState({blogs: json});
			}).catch(() => {
		})
	}

	render() {
		return(
			<div>
				<HeaderMenu />
				<div style={{marginTop:'10px'}}>
					<div className="row" style={{marginLeft:'20px', marginRight:'20px'}}>
						<div className="col-md-12">
							<nav className="navbar navbar-expand-lg navbar-light bg-light">
								<div className="collapse navbar-collapse" id="navbarSupportedContent">
									<ul className="navbar-nav mr-auto">
										<li id="category-dropdown" className="nav-item active">
											<Dropdown/>
										</li>
										<li className="nav-item">
											<a id="new-posting" className="nav-link" href="/blog/new"><b>New Posting</b></a>
										</li>
										<li className="nav-item">
											<a id="my-posting" className="nav-link" href="/blog/mypost"><b>My Posting</b></a>
										</li>
									</ul>
									<form className="form-inline my-2 my-lg-0">
										<input className="form-control mr-sm-2" type="search" placeholder="Search" onChange={this.onSearchChange}
												aria-label="Search"/>
										<button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.onSubmitSearch}>Search</button>
									</form>
								</div>
							</nav>
						</div>
					</div>
					<div id="data" className="row" style={{marginLeft:'30px', marginRight:'30px'}}>
						{this.state.blogs.map((data, i) => <BlogData key = {i} data = {data} editor={this.state.editorState} onChange={this.onEditorChange} blockRendererFn={mediaBlockRenderer} plugins={this.plugins} />)}
					</div>
					<div className="row justify-content-md-center" style={{marginLeft:'30px', marginRight:'30px'}}>
						<Pagination
							activePage={this.state.activePage}
							itemsCountPerPage={10}
							totalItemsCount={450}
							pageRangeDisplayed={5}
							onChange={this.handlePageChange}
							itemClass="page-item"
							linkClass="page-link"
							/>
					</div>
				</div>
			</div>
		);
	}
}

class BlogData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState:  EditorState.createEmpty(),
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

	render() {
		let approvedBlog;
		approvedBlog = (
			<div className="jumbotron" style={{height:'600px'}}>
				<h3>{this.props.data.title}</h3>
				<p className="lead">{this.props.data.summary}</p>
				<p className="lead">
					<a className="btn btn-primary btn-lg" href={"/blog?title=" + this.props.data.title} role="button">Read more</a>
				</p>
			</div>
		);


		return(
			<div className="col-md-4" style={{marginTop: '20px'}}>
				{approvedBlog}
			</div>


		);
	}
}

export default NewPosting;
