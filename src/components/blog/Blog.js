import React from 'react';
import Dropdown from "../dropdownmenu/CategoryDropdown";
import ProxyServices from "../../Service/ProxyServices";
import queryString from "query-string";
import { withRouter } from 'react-router-dom';
import BlogComment from './BlogComment';
import DisplayComment from './DisplayComment';
import { EditorState, RichUtils, AtomicBlockUtils, convertFromRaw } from 'draft-js';
import Editor from "draft-js-plugins-editor";
import { mediaBlockRenderer } from "./MediaBlockrenderer";


class Blog extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			//editorState: EditorState.createWithContent(convertFromRaw(initialState)),
			editorState: EditorState.createEmpty(),
			blogs: [],
			blog: {},
			id : 0,
			title: ''
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

	handleKeyCommand = (command) => {
		const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
		if (newState) {
			this.O(newState);
			return 'handled';
		}
		return 'not-handled';
	}

	componentDidMount() {
		let params = queryString.parse(this.props.location.search);

		if (params.title) {
			ProxyServices.getBlogByTitle(params.title)
				.then(response => response.data)
				.then((json) => {
					this.setState({blog: json, id: json.id, title: json.title});
					this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(json.content))) })
				}).catch(() => {
			})
		}

	}


	render() {

		const { id, title } = this.state;

		return(
			<div className="container" style={{marginTop:'20px'}}>
				<div className="row" style={{marginLeft:'20px', marginRight:'20px'}}>
					<div className="col-md-12">
						<nav className="navbar navbar-expand-lg navbar-light bg-light">
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav mr-auto">
									<li className="nav-item active">
										<Dropdown/>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="/blog/new"><b>New Posting</b></a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="/blog/my"><b>My Posting</b></a>
									</li>
								</ul>
								<form className="form-inline my-2 my-lg-0">
									<input className="form-control mr-sm-2" type="search" placeholder="Search"
										   aria-label="Search"/>
									<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
								</form>
							</div>
						</nav>
					</div>
				</div>
				<div className="row"  style={{marginTop:'20px'}}>
					<div className="col-md-12">
						<div className="card">
							<div className="card-body">
								<center><h2>{this.state.blog.title}</h2></center> <br/>
								<Editor editorState={this.state.editorState} onChange={this.onEditorChange} handleKeyCommand={this.handleKeyCommand} blockRendererFn={mediaBlockRenderer} plugins={this.plugins} />
							</div>
						</div>
					</div>
				</div>
				<div className="row"  style={{marginTop:'20px'}}>
					<div id="display-comment" className="col-md-12">
						<DisplayComment title={title} />
					</div>
				</div>
				<div className="row"  style={{marginTop:'20px'}}>
					<div id="send-comment" className="col-md-12">
						<BlogComment history={this.props.history} id={id} title={title}/>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Blog);
