import React from 'react';
import Main from "./Main";
import HeaderMenu from "../../components/HeaderMenu";

class CreateCategory extends React.Component {

	render() {
		return(
			<div>
				<HeaderMenu />
				<div style={{marginTop:'50px'}}>
					<div className="row" style={{marginLeft:'20px', marginRight:'20px'}}>
						<div className="col-md-12">

						</div>
					</div>
					<div className="row" style={{marginLeft:'20px', marginRight:'20px'}}>
						<div className="col-md-3">
						</div>
						<div className="col-md-9">
							<Main history={this.props.history}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CreateCategory;
