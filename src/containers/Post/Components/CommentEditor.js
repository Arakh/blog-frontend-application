import React from 'react';
import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import Editor from "draft-js-plugins-editor";
import { Button } from "react-bootstrap";
import { mediaBlockRenderer } from "../../../components/MediaBlockRenderer";
import ProxyServices from "../../../Service/ProxyServices";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

class BlogComment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
            comment: '',
            blogId: '',
            blogTitle: ''
        }

        this.onEditorChange = this.onEditorChange.bind(this);
        this.onSubmitComment = this.onSubmitComment.bind(this);
    }

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
        if (newState) {
            this.O(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    componentDidMount() {
        this.setState({blogId: this.props.id, blogTitle: this.props.title});
    }


    onURLChange = e => this.setState({ urlValue: e.target.value });

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
        this.setState({editorState, comment: this.state.editorState.getCurrentContent().getPlainText()});
    }

    onSubmitComment() {

        if (this.state.comment) {
            let payload = {
                comment: this.state.comment,
                postId: this.props.id,
                postTitle: this.props.title,
                username: localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
            }

            ProxyServices.submitComment(payload)
                .then(response => response.data)
                .then((json) => {
                    this.setState({editorState: EditorState.createEmpty()});
                    this.props.history.push("/blog?title="+this.props.title);
                }).catch(() => {

            })
        }
    }

    render() {
        return(
            <div className="editorContainer">
                <div className="card">
                    <div className="card-header">
                        INSERT COMMENT
                    </div>
                    <div className="card-body">
                        <div className="menuButtons">
                            <Button variant="light" onClick={this.onUnderlineClick}>U</Button>
                            <Button variant="light" onClick={this.onBoldClick}>
                                <b>B</b>
                            </Button>
                            <Button variant="light" onClick={this.onItalicClick}>
                                <em>I</em>
                            </Button>
                            <Button variant="light" onClick={this.onAddImage}>Image
                            </Button>
                        </div>
                        <Editor style = {{ maxHeight: '200px', overflow: 'auto'}} editorState={this.state.editorState} onChange={this.onEditorChange} handleKeyCommand={this.handleKeyCommand} blockRendererFn={mediaBlockRenderer}  plugins={this.plugins}
                                ref="editor"/>
                    </div>
                    <div className="card-footer">
                        <Button id="send" onClick={this.onSubmitComment}>Send</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BlogComment;
