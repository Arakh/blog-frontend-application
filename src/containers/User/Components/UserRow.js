import React from 'react';
import { Button } from 'react-bootstrap';

const UserRow = (props) => {

	return (
		<tr>
			<td>{props.data.username}</td>
			<td>{props.data.email}</td>
			<td>{props.data.roles}</td>
			<td>{JSON.stringify(props.data.enabled)}</td>
			<td>
                <Button variant="link" href={'/user/edit/'+props.data.username}>Edit</Button>
			    <Button variant="link" onClick={() => props.onDeleteConfirmation(props.data.username)}>Delete</Button>
            </td>
		</tr>
	);
}

export default UserRow;