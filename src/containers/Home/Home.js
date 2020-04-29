import React from 'react';
import { withRouter } from 'react-router-dom';
import PostList from "../../components/Posts/PostList";
import HeaderMenu from "../../components/HeaderMenu";

class Home extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<HeaderMenu />
				<PostList link="/home?category="
					location={this.props.location}
					source="Home"
				/>
			</div>
		)
	}
}

export default withRouter(Home);


