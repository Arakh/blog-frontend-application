import React, {Component} from 'react';
import Report from 'bv-react-data-report';
import ProxyServices from "../../Service/ProxyServices";
import CanvasJSReact from '../../library/canvasjs.react';
import SockJsClient from 'react-stomp';
import {NotificationManager} from "react-notifications";

export class Reporting extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			statistic: [],
			approvalstatistic: [],
			blognumberpercategory: [],
			rownum: 0,
			approvalresultstatistic: [],
			blognumberpercategoryV2: [],
			approvalstatisticv2: [],
			approvalresultstatisticv2: []
		}

		this.setReport = this.setReport.bind(this);
		this.setReportV2 = this.setReportV2.bind(this);
		this.setReportApprovalStatistic = this.setReportApprovalStatistic.bind(this);
		this.setReportApprovalStatisticV2 = this.setReportApprovalStatisticV2.bind(this);
		this.setReportApprovalResultStatistic = this.setReportApprovalResultStatistic.bind(this);
		this.setReportApprovalResultStatisticV2 = this.setReportApprovalResultStatisticV2.bind(this);
	}

	setReport = function(message) {
		this.setState({blognumberpercategory: message});
	}

	setReportV2 = function(message) {
		this.setState({blognumberpercategoryV2: message});
	}

	setReportApprovalStatistic = function(message) {
		this.setState({approvalstatisticv2: message});
	}

	setReportApprovalStatisticV2 = function(message) {
		this.setState({approvalstatistic: message});
	}

	setReportApprovalResultStatistic = function(message) {
		this.setState({approvalresultstatisticv2: message});
	}

	setReportApprovalResultStatisticV2 = function(message) {
		this.setState({approvalresultstatistic: message});
	}


	componentDidMount() {
		ProxyServices.getStatistic()
			.then(response => response.data)
			.then((json) => {
				this.setState({statistic: json})
			}).catch(() => {
		})

		ProxyServices.getBlogNumberPerCategory()
			.then(response => response.data)
			.then((json) => {
				this.setState({blognumberpercategory: json})
			}).catch(() =>{

			});

		ProxyServices.getBlogNumberPerCategoryV2()
			.then(response => response.data)
			.then((json) => {
				this.setState({blognumberpercategoryV2: json})
			}).catch(() =>{

		});

		ProxyServices.getApprovalStatistic()
			.then(response => response.data)
			.then((json) => {
				this.setState({approvalstatistic: json})
			}).catch(() =>{

		});

		ProxyServices.getApprovalResultStatistic()
			.then(response => response.data)
			.then((json) => {
				this.setState({approvalresultstatistic: json})
			}).catch(() =>{

		});

		ProxyServices.getApprovalResultStatisticV2()
			.then(response => response.data)
			.then((json) => {
				this.setState({approvalresultstatisticv2: json})
			}).catch(() =>{

		});

		ProxyServices.getApprovalStatisticV2()
			.then(response => response.data)
			.then((json) => {
				this.setState({approvalstatisticv2: json})
			}).catch(() =>{

		});
	}

	render() {
		return (
			<div>
				<div className="row">

					<div className="col-md-12" style={{marginTop:'20px', marginLeft: '10px', marginRight: '15px'}}>
						<div className="card" style={{marginTop:'20px', marginLeft: '10px', marginRight: '30px'}}>
							<div className="card-header"><center><b>BLOG DASHBOARD</b></center></div>
							<div className="card-body">
								<div className="row align-content-center">
									<div className="col-md-6 align-content-center"><BlogCategories data={this.state.blognumberpercategory}/></div>
									<div className="col-md-6 align-content-center"><BlogCategoriesAmount data={this.state.blognumberpercategoryV2}/></div>
								</div>
							</div>
						</div>
					</div>

				</div>
				<div className="row">
					<div className="col-md-12" style={{marginTop:'20px', marginLeft: '10px', marginRight: '15px'}}>
						<div className="card" style={{marginTop:'20px', marginLeft: '10px', marginRight: '30px'}}>
							<div className="card-header"><center><b></b></center></div>
							<div className="card-body">
								<div className="row align-content-center">
									<div className="col-md-6 align-content-center"><ApprovalMonitoring data={this.state.approvalstatistic} /></div>
									<div className="col-md-6 align-content-center"><ApprovalMonitoringV2 data={this.state.approvalstatisticv2} /></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12" style={{marginTop:'20px', marginLeft: '10px', marginRight: '15px'}}>
						<div className="card" style={{marginTop:'20px', marginLeft: '10px', marginRight: '30px'}}>
							<div className="card-header"><center><b></b></center></div>
							<div className="card-body">
								<div className="row align-content-center">
									<div className="col-md-6 align-content-center"><ApprovalStatistic data={this.state.approvalresultstatistic} /></div>
									<div className="col-md-6 align-content-center"><ApprovalStatisticV2 data={this.state.approvalresultstatisticv2} /></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row" style={{marginTop:'20px', marginLeft: '10px', marginRight: '15px'}}>
					<div className="col-md-2"></div>
					<div className="col-md-6" style={{marginTop:'20px', marginLeft: '0px', marginRight: '15px'}}>
						<Report data={this.state.statistic} opening={(<h1>This is an opening content.</h1>)} closing={(<h1>This is a closing content.</h1>)}/>
					</div>
					<div className="col-md-2"></div>
				</div>
				<div>
					<SockJsClient url='http://localhost:8087/stomp' topics={['/topic/statistic']}
								  onMessage={(msg) => {
									  console.log("Message from websocket:",msg);
									  this.setReport(msg);

								  }}/>
				</div>
				<div>
					<SockJsClient url='http://localhost:8087/stomp' topics={['/topic/blog-number']}
								  onMessage={(msg) => {
									  console.log("Message from websocket:",msg);
									  this.setReportV2(msg);

								  }}/>
				</div>
				<div>
					<SockJsClient url='http://localhost:8087/stomp' topics={['/topic/approval-statistic']}
								  onMessage={(msg) => {
									  console.log("Message from websocket:",msg);
									  this.setReportApprovalStatistic(msg);

								  }}/>
				</div>
				<div>
					<SockJsClient url='http://localhost:8087/stomp' topics={['/topic/approval-statistic-v2']}
								  onMessage={(msg) => {
									  console.log("Message from websocket:",msg);
									  this.setReportApprovalStatisticV2(msg);
								  }}/>
				</div>
				<div>
					<SockJsClient url='http://localhost:8087/stomp' topics={['/topic/approval-result-statistic']}
								  onMessage={(msg) => {
									  console.log("Message from websocket:",msg);
									  this.setReportApprovalResultStatistic(msg);
								  }}/>
				</div>
				<div>
					<SockJsClient url='http://localhost:8087/stomp' topics={['/topic/approval-result-statistic-v2']}
								  onMessage={(msg) => {
									  console.log("Message from websocket:",msg);
									  this.setReportApprovalResultStatisticV2(msg);
								  }}/>
				</div>
			</div>
		);
	}
}

class BlogCategories extends React.Component {
	render() {

		let approved = 25;
		let inprogress = 12;
		let rejected = 5;

		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "dark2",
			title:{
				text: "Blog Number Per Category (%)"
			},
			data: [{
				type: "bar",
				indexLabel: "{y}%",
				startAngle: -90,
				dataPoints: this.props.data
			}]
		}

		return (
			<div>
				<CanvasJSReact.CanvasJSChart options = {options}/>
			</div>
		);
	}
}

class BlogCategoriesAmount extends React.Component {
	render() {

		let approved = 25;
		let inprogress = 12;
		let rejected = 5;

		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "dark2",
			title:{
				text: "Blog Number Per Category (Amount)"
			},
			data: [{
				type: "bar",
				indexLabel: "{y}",
				startAngle: -90,
				dataPoints: this.props.data
			}]
		}

		return (
			<div>
				<CanvasJSReact.CanvasJSChart options = {options}/>
			</div>
		);
	}
}

class ApprovalMonitoring extends React.Component {
	render() {

		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "dark2",
			title:{
				text: "Approval Process (%)"
			},
			data: [{
				type: "pie",
				indexLabel: "{label}: {y}%",
				startAngle: -90,
				dataPoints: this.props.data
			}]
		}

		return (
			<div>
				<CanvasJSReact.CanvasJSChart options = {options}/>
			</div>
		);
	}
}

class ApprovalMonitoringV2 extends React.Component {
	render() {

		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "dark2",
			title:{
				text: "Approval Process (Amount)"
			},
			data: [{
				type: "pie",
				indexLabel: "{label}: {y}",
				startAngle: -90,
				dataPoints: this.props.data
			}]
		}

		return (
			<div>
				<CanvasJSReact.CanvasJSChart options = {options}/>
			</div>
		);
	}
}

class ApprovalStatistic extends React.Component {
	render() {

		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "dark2",
			title:{
				text: "Approval Result (%)"
			},
			data: [{
				type: "pie",
				indexLabel: "{label}: {y}%",
				startAngle: -90,
				dataPoints: this.props.data
			}]
		}

		return (
			<div>
				<CanvasJSReact.CanvasJSChart options = {options}/>
			</div>
		);
	}
}

class ApprovalStatisticV2 extends React.Component {
	render() {

		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "dark2",
			title:{
				text: "Approval Result (Amount)"
			},
			data: [{
				type: "pie",
				indexLabel: "{label}: {y}",
				startAngle: -90,
				dataPoints: this.props.data
			}]
		}

		return (
			<div>
				<CanvasJSReact.CanvasJSChart options = {options}/>
			</div>
		);
	}
}

export default Reporting;

