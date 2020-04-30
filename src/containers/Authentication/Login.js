import React, {Component} from 'react'
import ProxyServices from '../../Service/ProxyServices'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import HeaderMenu from "../../components/HeaderMenu";

class LoginComponent extends Component {

	constructor(props) {
		super(props);

		this.state = {
			formControls: {
				username: {
					value: ''
				},
				password: {
					value: ''
				}
			},
			hasLoginFailed: '',
			showSuccessMessage: ''

		}

		this.handleChange = this.handleChange.bind(this);
		this.loginClicked = this.loginClicked.bind(this);
	}

	handleChange = event => {

		const name = event.target.name;
		const value = event.target.value;

		this.setState({
			formControls: {
				...this.state.formControls,
				[name]: {
					...this.state.formControls[name],
					value
				}
			}
		});
	}


	loginClicked(e) {
		e.preventDefault();

		ProxyServices.executeBasicAuthenticationService(this.state.formControls.username.value, this.state.formControls.password.value)
			.then(response => response.data)
			.then((json) => {
				ProxyServices.registerSuccessfulLogin(this.state.formControls.username.value, this.state.formControls.password.value, json.data.token);

				const lastLocation = this.props.location.state;
				if (lastLocation) {
					this.props.history.push(this.props.location.state);
				} else {
					this.props.history.push("home");
				}
			}).catch(() => {
			this.setState({showSuccessMessage: false})
			this.setState({hasLoginFailed: true})
		})
	}

	render() {
		return (
			<div>
				<HeaderMenu />
				<div className="app flex-row align-items-center" style={{marginTop:'100px'}}>
					<Container>
						<Row className="justify-content-center">
							<Col md="8">
								<CardGroup>
									<Card className="p-4">
										<CardBody>
											<Form>
												<h1>Login</h1>
												<p className="text-muted"> {this.state.hasLoginFailed && <div id="error" className="alert alert-warning">Invalid Credentials</div>}
													{this.state.showSuccessMessage} Sign In to your account</p>
												<InputGroup className="mb-3">
													<InputGroupAddon addonType="prepend">
														<InputGroupText>
															<i className="icon-user"></i>
														</InputGroupText>
													</InputGroupAddon>
													<input type="text" name="username" placeholder="Insert your username..."
														onChange={this.handleChange} value={this.state.formControls.username.value}/>
												</InputGroup>
												<InputGroup className="mb-4">
													<InputGroupAddon addonType="prepend">
														<InputGroupText>
															<i className="icon-lock"></i>
														</InputGroupText>
													</InputGroupAddon>
													<input type="password" name="password" placeholder="Insert your password..."
														value={this.state.formControls.password.value} onChange={this.handleChange}/>
												</InputGroup>
												<Row>
													<Col xs="6">
														<Button id="submit" color="primary" className="px-4" onClick={this.loginClicked}>Login</Button>
													</Col>
													<Col xs="6" className="text-right">
														<a href="/reset">Reset Password</a>
													</Col>
												</Row>
											</Form>
										</CardBody>
									</Card>
									<Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
										<CardBody className="text-center">
											<div>
												<h2>Sign up</h2>
												<p>Welcome in Mitrais CDC Blog, please sign up if you would like to create blog.</p>
												<Link to="/user/register">
													<Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
												</Link>
											</div>
										</CardBody>
									</Card>
								</CardGroup>
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { AuthenticationReducer } = state
	const { username } = AuthenticationReducer

	let usernameLength = username?username.length:0;

	return {
		isUserHasLogin: usernameLength > 0 ? true:false,
		errorLogin: AuthenticationReducer.errorLogin,
		signing: AuthenticationReducer.signing,
		username: AuthenticationReducer.username,
		password: AuthenticationReducer.password,
	}
}

const Login = connect(mapStateToProps)(LoginComponent)

export default Login;

