import React from 'react';
import { EditorState, RichUtils, ContentState } from 'draft-js';

import ProxyServices from "../../../Service/ProxyServices";
import CommentItem from "./CommentItem";

class CommentList extends React.Component {

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
						{this.state.comments.map((data, i) => <CommentItem key = {i} data = {data} />)}
					</div>
				</div>
			</div>
		);
	}
}

export default CommentList;