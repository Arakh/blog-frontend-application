import React from 'react';
import ProxyServices from '../../Service/ProxyServices';
import axios from "axios";
import { EditorState, RichUtils, AtomicBlockUtils, convertToRaw } from 'draft-js';
import Editor from "draft-js-plugins-editor";
import { mediaBlockRenderer } from "./MediaBlockrenderer";
import { convertToHTML } from 'draft-convert';

class Main extends React.Component{

    constructor(props){
        super(props);

        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.state = {
            blogs: [],
            categories: [],
            category: 'Enterprise Application Integration',
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
        this.onContentChange = this.onContentChange.bind(this);
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

    onEditorChange(editorState){
        console.log("TEXT:", this.state.editorState.getCurrentContent().getPlainText());
        console.log("BLOG-CONTENT:", convertToRaw(editorState.getCurrentContent()));
        //this.setState({editorState, comment: this.state.editorState.getCurrentContent().getPlainText()});
        /*this.setState({editorState, content: this.state.editorState.getCurrentContent().getPlainText()});*/
        this.setState({editorState, content: JSON.stringify(convertToRaw(editorState.getCurrentContent())), contentText: this.state.editorState.getCurrentContent().getPlainText()});
    }


    onCategoryOnChange(event){
        console.log("Category:", event.target.options[event.target.selectedIndex].text);
        console.log("Category ID:", event.target.value);
        this.setState({category: event.target.options[event.target.selectedIndex].text, categoryId: event.target.value});
    }

    onSubmitBlog(event){
        console.log("Category Id:", event.target.key);
        //event.preventDefault();

        const content = convertToHTML(this.state.editorState.getCurrentContent());
        // content to save to the db
        const contentToSave = JSON.stringify(content);
        console.log("Content:",contentToSave);

        if(this.state.title != "" && this.state.category !== "" && this.state.content !== ""){
            let payload = {
                categoryId: this.state.categoryId,
                categoryName: this.state.category,
                content: this.state.content,
                summary: this.state.contentText,
                title: this.state.title,
            }

            ProxyServices.submitBlog(payload)
                .then(response => response.data)
                .then((json) => {
                    this.props.history.push("/home");
                    console.log("TOKEN:", JSON.stringify(json.data.token));
                    console.log("Response:", JSON.stringify(json));

                }).catch(() => {

            })
        }else{
            this.setState({message: 'please insert all required field'});
        }

    }

    onTitleChange(event){
        console.log("Title:", event.target.value);
        this.setState({title: event.target.value});
    }

    onContentChange(event){
        console.log("content:", event.target.value);
        this.setState({content: event.target.value});
    }

    componentDidMount() {
        ProxyServices.getCategoryList()
            .then(response => response.data)
            .then((json) => {
                console.log("Response:", JSON.stringify(json));
                this.setState({categories: json});
                console.log("Categories:", (this.state.categories));
            }).catch(() => {
        })
    }

    render() {

        let data = this.state.categories;

        return(
            <div className="card">
                <div className="card-header">
                    CREATE BLOG [{this.state.message}]
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-1">
                            Title:
                        </div>
                        <div className="col-md-7" style={{marginLeft:'0px'}}>
                            <input type="text" name="title" id="id" onChange={this.onTitleChange} placeholder="Please insert the blog title..." size="50"/>
                        </div>
                        <div className="col-md-4" style={{marginLeft:'0px'}}>
                        </div>
                    </div>
                    <div className="row" style={{marginTop:'20px'}}>
                        <div className="col-md-1">
                            Category:
                        </div>
                        <div className="col-md-7" style={{marginLeft:'0px'}}>
                            {/*<Dropdown/>*/}
                            <select id="category" onChange={this.onCategoryOnChange}>
                            {this.state.categories.map((data, i) => <CategoryList key = {i} data = {data} />)}
                            {console.log(this.state.categories)}
                            </select>
                        </div>
                        <div className="col-md-4" style={{marginLeft:'0px'}}>
                        </div>
                    </div>
                    <div className="row" style={{marginTop:'20px'}}>
                        <div className="col-md-1">
                            Blog:
                        </div>
                        <div className="col-md-7" style={{marginLeft:'0px'}}>
                            {/*<EditorComponent/>*/}
                            {/*<textarea rows = "20" cols = "120" name = "description" id="content" onChange={this.onContentChange}>
                            </textarea>*/}

                            <div className="menuButtons">
                                <button onClick={this.onUnderlineClick}>U</button>
                                <button onClick={this.onBoldClick}>
                                    <b>B</b>
                                </button>
                                <button onClick={this.onItalicClick}>
                                    <em>I</em>
                                </button>
                                <button className="inline styleButton" onClick={this.onAddImage}>
                                    <i
                                        className="material-icons"
                                        style={{
                                            fontSize: "16px",
                                            textAlign: "center",
                                            padding: "0px",
                                            margin: "0px"
                                        }}
                                    >
                                        image
                                    </i>
                                </button>
                            </div>

                            <Editor style = {{ maxHeight: '200px', overflow: 'auto'}} editorState={this.state.editorState} onChange={this.onEditorChange} handleKeyCommand={this.handleKeyCommand} blockRendererFn={mediaBlockRenderer}  plugins={this.plugins}
                                        ref="editor"/>



                        </div>
                        <div className="col-md-4" style={{marginLeft:'0px'}}>
                        </div>
                    </div>
                    <div className="row" style={{marginTop:'20px'}}>
                        <div className="col-md-1">
                        </div>
                        <div className="col-md-7" style={{marginLeft:'0px'}}>
                            <button id="createblog" className="btn btn btn-primary" onClick={this.onSubmitBlog}>Submit</button>
                        </div>
                        <div className="col-md-4" style={{marginLeft:'0px'}}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class CategoryList extends React.Component{
    render() {
        return(
            <option value={this.props.data.id}>{this.props.data.name}</option>
        );
    }
}

export default Main;

