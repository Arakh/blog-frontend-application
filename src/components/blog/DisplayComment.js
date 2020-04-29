import React from 'react';
import { EditorState, RichUtils, AtomicBlockUtils, ContentState } from 'draft-js';
import ProxyServices from "../../Service/ProxyServices";

class InsertComment extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			editorState: EditorState.createWithContent(ContentState.createFromText('')),
			comment: '',
			comments: [],
			blogId: '',
			blogTitle: ''
		}

		this.onEditorChange = this.onEditorChange.bind(this);
	}

	onEditorChange(editorState) {
		this.setState({editorState, comment: this.state.editorState.getCurrentContent().getPlainText()});
	}

	handleKeyCommand = (command) => {
		const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
		if (newState) {
			this.O(newState);
			return 'handled';
		}
		return 'not-handled';
	}

	componentWillReceiveProps(newProps) {
		ProxyServices.getCommentByTitle(newProps.title)
			.then(response => response.data)
			.then((json) => {
				this.setState({comments: json});
			}).catch(() => {

		})
	}

	render() {

		return(
			<div className="card">
				<div className="card-header">
					BLOG COMMENT
				</div>
				<div className="card-body">
					<div style={{overflowY:'auto' , height: '300px'}}>
						{this.state.comments.map((data, i) => <CommentList key = {i} data = {data} />)}
					</div>
				</div>
			</div>
		);
	}
}

class CommentList extends React.Component {

	render() {
		return(
			<div>
				{this.props.data.comment} <br/>
				(<b>{this.props.data.username}</b>) <hr/>
			</div>
		);
	}
}

export default InsertComment;
