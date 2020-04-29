import React from 'react';
import { withRouter } from 'react-router-dom';
import PostList from "../../components/Posts/PostList";

class Home extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<PostList link="/home?category="
					location={this.props.location}
					source="Home"
				/>
			</div>
		)
	}
}

export default withRouter(Home);


