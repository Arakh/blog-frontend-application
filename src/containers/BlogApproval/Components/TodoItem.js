import React from "react";

const TodoItem = (props) => {

    return (
        <div>
            <div className="card">
                <div className="card-header bg-primary text-white">{props.data.title}</div>
                <div className="card-body">
                    <p>{props.data.createdDate}</p>
                    <p>{props.data.summary}......<a href={"/blog?title="+props.data.title}>Read More..</a></p>
                    <a className="btn btn-primary" href={"/blog/approval?id="+props.data.id+"&status=nil&progress=In Progress"} role="button">Process</a>
                </div>
            </div>
            <hr/>
        </div>
    );
}

export default TodoItem;