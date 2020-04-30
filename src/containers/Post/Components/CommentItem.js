import React from 'react';

const CommentItem = (props) => {

    return(
        <div>
            {props.data.comment} <br/>
            (<b>{props.data.username}</b>) <hr/>
        </div>
    );
}

export default CommentItem;