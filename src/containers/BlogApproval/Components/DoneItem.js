import React from 'react';

const DoneItem = (props) => {

    let status;

    if (props.data.status) {
        status = "Approved";
    } else {
        status = "Rejected";
    }

    return (
        <div>
            <div className="card">
                <div className="card-header bg-secondary text-white">{props.data.title}</div>
                <div className="card-body">
                    <p>{props.data.createdDate}</p>
                    <p>{props.data.summary}......<a href="#">Read More..</a></p>

                    <div className={props.data.status ? "col-md-12 btn-info" : "col-md-12 btn-warning"}>
                        <center><label className={props.data.status ? "btn-info" : "btn-warning"}><b>{status}</b></label></center>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
    );
}

export default DoneItem;
