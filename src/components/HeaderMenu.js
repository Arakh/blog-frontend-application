import React from 'react';
import AuthenticationService from "../Service/ProxyServices";
import {Redirect} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

import "./blog/css/style.css"

class HeaderMenu extends React.Component {

	constructor(props) {
		super(props);

		this.state = {

		}
	}

	listOfMenu() {
		if (AuthenticationService.isUserLoggedIn) {
			return (
				<>
					<Nav className="mr-auto">
						<NavDropdown title="Post" id="post-nav-dropdown">
							<NavDropdown.Item href="/blog/create">Create Post</NavDropdown.Item>
							<NavDropdown.Item href="/blog/mypost">My Post</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown title="Category" id="category-nav-dropdown">
							<NavDropdown.Item href="/category/create">Create Blog Category</NavDropdown.Item>
							<NavDropdown.Item href="/category/list">Category List</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link href="/blog/approval">Blog Approval</Nav.Link>
						<Nav.Link href="/user/list">User List</Nav.Link>
						<Nav.Link href="/admin/reporting">Reporting</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link href="/logout">Logout</Nav.Link>
					</Nav>
				</>
			);
		} else {
			return (
				<Nav>
					<Nav.Link href="/login">Login</Nav.Link>
					<Nav.Link href="/user/register">Sign Up</Nav.Link>
				</Nav>
			);
		}
	}

	render() {
		return(
			<div className="bg-purple">
				<Navbar expand="xl" variant="dark">
					<Navbar.Brand href="/">Mitrais CDC Blog</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-main-navbar" />
					<Navbar.Collapse id="responsive-main-navbar">
						<this.listOfMenu />
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

export default HeaderMenu;
