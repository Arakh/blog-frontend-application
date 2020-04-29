import React , { Component } from 'react';
import AppRouter from "../route/router";

class MainContent extends Component {
	render() {
		return (
			<div>
				<div>
					<main style={{marginLeft:'0px' , marginRight:'0px', width:'100%'}}>
						<div className="row">
							<div className="col-md-12">
								<AppRouter/>
							</div>
						</div>
					</main>
				</div>
			</div>
		);
	}
}

export default MainContent;
