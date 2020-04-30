import React from 'react';
import { EditorState, RichUtils, AtomicBlockUtils, convertToRaw } from 'draft-js';
import Editor from "draft-js-plugins-editor";
import { Alert, Form, Col, Row, Button } from "react-bootstrap";

import ProxyServices from '../../../Service/ProxyServices';
import { mediaBlockRenderer } from "../../../components/MediaBlockRenderer";

class PostEditor extends React.Component {

	constructor(props) {
		super(props);

		let today = new Date();
		let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

		this.state = {
			blogs: [],
			categories: [],
			categoryId: 1,
			title: '',
			content: '',
			contentText: '',
			date: date,
			message: '',
			editorState: EditorState.createEmpty(),
			comment: '',
		}
		this.onCategoryOnChange = this.onCategoryOnChange.bind(this);
		this.onSubmitBlog = this.onSubmitBlog.bind(this);
		this.onTitleChange = this.onTitleChange.bind(this);
		this.onEditorChange = this.onEditorChange.bind(this);
	}

	handleKeyCommand = (command) => {
		const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
		if (newState) {
			this.O(newState);
			return 'handled';
		}
		return 'not-handled';
	}

	focus = () => this.refs.editor.focus();

	onAddImage = e => {
		e.preventDefault();
		const editorState = this.state.editorState;
		const urlValue = window.prompt("Paste Image Link");
		const contentState = editorState.getCurrentContent();
		const contentStateWithEntity = contentState.createEntity(
			"image",
			"IMMUTABLE",
			{ src: urlValue }
		);
		const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
		const newEditorState = EditorState.set(
			editorState,
			{ currentContent: contentStateWithEntity },
			"create-entity"
		);
		this.setState(
			{
				editorState: AtomicBlockUtils.insertAtomicBlock(
					newEditorState,
					entityKey,
					" "
				)
			},
			() => {
				setTimeout(() => this.focus(), 0);
			}
		);
	};

	onUnderlineClick = () => {
		this.onEditorChange(
			RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
		);
	};

	onBoldClick = () => {
		this.onEditorChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
	};

	onItalicClick = () => {
		this.onEditorChange(
			RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
		);
	};

	onEditorChange(editorState) {
		this.setState({editorState, content: JSON.stringify(convertToRaw(editorState.getCurrentContent())), contentText: this.state.editorState.getCurrentContent().getPlainText()});
	}


	onCategoryOnChange(event) {
		this.setState({category: event.target.options[event.target.selectedIndex].text, categoryId: event.target.value});
	}

	onSubmitBlog(event) {
		if (this.state.title !== "" && this.state.category !== "" && this.state.content !== "" && this.state.category !== undefined) {

			let user = {
				firstname: localStorage.getItem("firstname"),
				id: localStorage.getItem("id"),
				lastname: localStorage.getItem("lastname"),
				username: localStorage.getItem("authenticatedUser")
			};

			let payload = {
				categoryId: this.state.categoryId,
				categoryName: this.state.category,
				content: this.state.content,
				summary: this.state.contentText,
				title: this.state.title,
				user: user
			}

			ProxyServices.submitBlog(payload)
				.then(response => response.data)
				.then((json) => {
					this.props.history.push("/home");

				}).catch(() => {

			})
		} else {
			this.setState({message: 'Please insert all required field'});
		}

	}

	onTitleChange(event) {
		this.setState({title: event.target.value});
	}

	componentDidMount() {
		const defaultCategory = {id:"", name:"-- Please select category --"};
		ProxyServices.getCategoryList()
			.then(response => response.data)
			.then((json) => {
				this.setState({categories: [defaultCategory, ...json]});
			}).catch(() => {
		})
	}

	render() {
		let alertMessage;
		if (this.state.message) {
			alertMessage = <Alert variant="danger">{this.state.message}</Alert>;
		}

		return(
			<div>
				{alertMessage}
				<div className="card">
					<div className="card-header">
						Create Post
					</div>
					<div className="card-body">
						<Form>
							<Form.Group as={Row} controlId="id">
								<Form.Label column md="1">
									Title
								</Form.Label>
								<Col md="11">
									<Form.Control type="text" name="title" id="id" onChange={this.onTitleChange} placeholder="Post Title"/>
								</Col>
							</Form.Group>
							<Form.Group as={Row} controlId="category">
								<Form.Label column md="1">
									Category
								</Form.Label>
								<Col md="11">
									<Form.Control as="select" id="category" custom onChange={this.onCategoryOnChange}>
										{this.state.categories.map((data, i) => <option key={i} value={data.id}>{data.name}</option>)}
									</Form.Control>
								</Col>
							</Form.Group>
							<Form.Group as={Row} controlId="PostEditor">
								<Form.Label column md="1">
									Content
								</Form.Label>
								<Col md="11">
									<div className="menuButtons">
										<Button variant="light" onClick={this.onUnderlineClick}>U</Button>
										<Button variant="light" onClick={this.onBoldClick}>
											<b>B</b>
										</Button>
										<Button variant="light" onClick={this.onItalicClick}>
											<em>I</em>
										</Button>
										<Button variant="light" onClick={this.onAddImage}>Image</Button>
									</div>

									<Editor style={{ minHeight: '200px', overflow: 'auto'}}
										editorState={this.state.editorState}
										onChange={this.onEditorChange}
										handleKeyCommand={this.handleKeyCommand}
										blockRendererFn={mediaBlockRenderer}
										plugins={this.plugins}
										ref="editor"
										id="PostEditor"
									/>
								</Col>
							</Form.Group>
							<div className="row float-right" style={{ paddingRight: '15px'}}>
								<Button id="createblog" onClick={this.onSubmitBlog}>Submit</Button>
							</div>
						</Form>
					</div>
				</div>
			</div>
		);
	}
}

export default PostEditor;
