import React from 'react';
import PostEditor from "./Components/PostEditor";
import HeaderMenu from "../../components/HeaderMenu";

class CreatePost extends React.Component {

    render() {
        return(
            <div>
                <HeaderMenu />
                <div className="row justify-content-md-center" style={{margin:'20px'}}>
                    <div className="col-md-9">
                        <PostEditor history={this.props.history}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreatePost;
