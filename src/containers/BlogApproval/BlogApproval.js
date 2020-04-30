import React from 'react';
import SockJsClient from 'react-stomp';
import queryString from "query-string";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import Todo from "./Components/Todo";
import InProgress from "./Components/InProgress";
import Done from "./Components/Done";
import ProxyServices from "../../Service/ProxyServices";
import HeaderMenu from "../../components/HeaderMenu";
import { Alert } from 'react-bootstrap';

class BlogApproval extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			id : 0,
			todo: [],
			inprogress: [],
			done: [],
			latestMessage: '',
			message: '',
			activePage: 1
		}

		this.getAllApprovalData = this.getAllApprovalData.bind(this);
		this.showNotification = this.showNotification.bind(this);
		this.errorOnSocket = this.errorOnSocket.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
	}

	handlePageChange(pageNumber) {
		this.setState({activePage: pageNumber});

		this.getAllApprovalData('To Do', pageNumber);
		this.getAllApprovalData('In Progress', pageNumber);
		this.getAllApprovalData('Done', pageNumber);
	}

	showNotification = function(message) {
		this.setState({message: message});
		NotificationManager.info(message);
	}

	errorOnSocket(message) {
		console.log("Message from stomp:", message);
	}

	componentDidMount() {
		let params = queryString.parse(this.props.location.search);

		if (params.id) {
			ProxyServices.updateProgressStatus(params.id, params.status, params.progress)
				.then(response => response.data)
				.then((json) => {
					this.setState({blogs: json});
					this.getAllApprovalData('To Do');
					this.getAllApprovalData('In Progress');
					this.getAllApprovalData('Done');
				}).catch(() => {
			})
		} else {
			this.getAllApprovalData('To Do');
			this.getAllApprovalData('In Progress');
			this.getAllApprovalData('Done');
		}
	}

	getAllApprovalData(progress, page) {
		ProxyServices.getAllApprovalData(progress, page-1)
			.then(response => response.data)
			.then((json) => {
				if (progress === 'To Do') {
					this.setState({todo: json});
				} else if (progress === 'In Progress')
				{
					this.setState({inprogress: json});
				}
				else {
					this.setState({done: json});
				}

			}).catch(() => {
		})
	}

	render() {
		let alertMessage;
		if (this.state.message) {
			alertMessage = (<div className="row justify-content-md-center" style={{marginTop:'20px'}}>
								<Alert variant="danger">{this.state.message}</Alert>
							</div>);
		}

		return(
			<div>
				<HeaderMenu />
				{alertMessage}
				<div className="row justify-content-md-center" style={{marginTop:'20px'}}>
					<div className="row"><b>Post Approval Process</b></div>
					<NotificationContainer/>
				</div>
				<div className="row" style={{marginTop:'20px', marginLeft: '10px', marginRight: '15px'}}>
					<div className="col-md-4  btn-primary">
						<div className="card-header"><center><b>TO DO</b></center></div>
					</div>
					<div className="col-md-4 btn-secondary">
						<div className="card-header"><center><b>IN PROGRESS</b></center></div>
					</div>
					<div className="col-md-4 btn-info">
						<div className="card-header"><center><b>DONE</b></center></div>
					</div>
				</div>
				<div className="row" style={{marginTop:'20px', marginLeft: '10px', marginRight: '10px'}}>
					<div className="col-md-4">
						<Todo todo={this.state.todo}/>
					</div>
					<div className="col-md-4">
						<InProgress inprogress={this.state.inprogress}/>
					</div>
					<div className="col-md-4">
						<Done done={this.state.done}/>
					</div>
				</div>
				<div>
					<SockJsClient url='http://localhost:8087/stomp' topics={['/topic/message']}
								  onMessage={(msg) => {
									  console.log("Message from websocket:",msg);
									  this.showNotification(msg);

								  }}/>
				</div>
			</div>


		);
	}
}

export default BlogApproval;

