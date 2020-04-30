import React, {Component} from 'react';
import TodoItem from './TodoItem';

class Todo extends Component {

	constructor(props) {
		super(props);
		this.state ={
			approval: []
		}
	}

	render() {

		let blog;

		blog = this.props.todo.map((data, i) => <TodoItem key = {i} data = {data} />);

		return (
			<div>
				{blog}
			</div>
		);
	}

}

export default Todo;
