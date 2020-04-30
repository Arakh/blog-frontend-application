import React from 'react';
import { Button } from 'react-bootstrap';

const CategoryRow = (props) => {
    return (
        <tr>
            <td>{props.data.id}</td>
            <td>{props.data.name}</td>
            <td>{props.data.description}</td>
            <td>
                <Button variant="link" href={'/category/edit/'+props.data.id}>Edit</Button>
                <Button variant="link" href={'/category/delete/'+props.data.delete}>Delete</Button>
            </td>
        </tr>
    );
}

export default CategoryRow;