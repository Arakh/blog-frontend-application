import React from 'react';
import { EditorState } from 'draft-js';

class PostThumbnail extends React.Component {

	constructor(props){
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
		let approvedBlog = (
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

export default PostThumbnail;