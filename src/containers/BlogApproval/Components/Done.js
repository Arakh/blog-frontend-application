import React, {Component} from 'react';
import DoneItem from './DoneItem';

class Done extends Component {

	constructor(props) {
		super(props);
		this.state ={
			approval: [],
			status: '',
		}
	}

	render() {
		let blog;
		blog = this.props.done.map((data, i) => <DoneItem key = {i} data = {data} />)

		return (
			<div>
				{blog}
			</div>
		);
	}
}

export default Done;
