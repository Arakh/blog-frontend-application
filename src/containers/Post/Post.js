import React from 'react';
import queryString from "query-string";
import { withRouter } from 'react-router-dom';
import { EditorState, RichUtils, convertFromRaw } from 'draft-js';
import Editor from "draft-js-plugins-editor";

import CommentList from './Components/CommentList';
import CommentEditor from './Components/CommentEditor';
import { mediaBlockRenderer } from "../../components/MediaBlockRenderer";
import ProxyServices from "../../Service/ProxyServices";
import HeaderMenu from "../../components/HeaderMenu";

class Post extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
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
			<div>
				<HeaderMenu />
				<div className="container" style={{marginTop:'20px'}}>
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
							<CommentList title={title} />
						</div>
					</div>
					<div className="row"  style={{marginTop:'20px'}}>
						<div id="send-comment" className="col-md-12">
							<CommentEditor history={this.props.history} id={id} title={title}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Post);
