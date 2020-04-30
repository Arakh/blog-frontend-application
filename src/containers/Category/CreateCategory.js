import React from 'react';

import CategoryForm from "./Components/CategoryForm";
import HeaderMenu from "../../components/HeaderMenu";

class CreateCategory extends React.Component {

	render() {
		return(
			<div>
				<HeaderMenu />
				<div className="row justify-content-md-center" style={{ marginTop: '20px' }}>
					<div className="col-md-8">
						<CategoryForm history={this.props.history}/>
					</div>
				</div>
			</div>
		);
	}
}

export default CreateCategory;
