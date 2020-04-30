import React, {Component} from 'react';
import InProgressItem from './InProgressItem';

class InProgress extends Component {

	constructor(props) {
		super(props);
		this.state ={
			approval: []
		}
	}

	render() {

		let blog;

		blog = this.props.inprogress.map((data, i) => <InProgressItem key = {i} data = {data} />)

		return (
			<div>
				{blog}
			</div>
		);
	}

}

export default InProgress;
