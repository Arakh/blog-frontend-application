import React from 'react';

const InProgressItem = (props) => {

    return (
        <div>
            <div className="card">
                <div className="card-header bg-secondary text-white">{props.data.title}</div>
                <div className="card-body">
                    <p>{props.data.createdDate}</p>
                    <p>{props.data.summary}......<a href={"/blog?title="+props.data.title}>Read More..</a></p>

                    <a className="btn btn-secondary" href={"/blog/approval?id="+props.data.id+"&status=Approved&progress=Done"} role="button">Approve</a>
                    <a className="btn btn-secondary" style={{marginLeft: '10px'}} href={"/blog/approval?id="+props.data.id+"&status=Rejected&progress=Done"} role="button">Reject</a>
                </div>
            </div>
            <hr/>
        </div>
    );
}

export default InProgressItem;