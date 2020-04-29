import React from 'react';
import { withRouter } from 'react-router-dom';
import PostList from "../../components/Posts/PostList";

class MyPost extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<PostList link="/blog/mypost?category="
					location={this.props.location}
					author={localStorage.getItem('authenticatedUser')}
					source="MyPost"
				/>
			</div>
		)
	}
}

export default withRouter(MyPost);


