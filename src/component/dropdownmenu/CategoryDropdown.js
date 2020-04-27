import React from 'react'
import ProxyServices from "../../Service/ProxyServices";

class Dropdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			blogs: [],
			categories: [],
			isOpen: false,
			link: '/home?category='
		}

	}

	componentDidMount() {

		if (this.props.link) {
			this.setState({link: this.props.link});
		}

		ProxyServices.getCategoryList()
			.then(response => response.data)
			.then((json) => {
				this.setState({categories: json});
			}).catch(() => {
		})
	}

	toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

	render() {
		const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
		return (
			<div className="dropdown" onClick={this.toggleOpen}>
				<button
					className="btn btn-secondary dropdown-toggle"
					type="button"
					id="dropdownMenuButton"
					data-toggle="dropdown"
					aria-haspopup="true"
				>
					Category
				</button>
				<div className={menuClass} aria-labelledby="dropdownMenuButton">
					{this.state.categories.map((data, i) => <CategoryList key = {i} data = {data} link={this.state.link} />)}
				</div>
			</div>
		);
	}
}

class CategoryList extends React.Component {
	render() {
		return(
			<a className="dropdown-item" href={this.props.link + this.props.data.name}>
				{this.props.data.name}
			</a>
		);
	}
}


export default Dropdown;
