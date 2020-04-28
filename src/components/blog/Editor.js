// Note that Froala Editor has to be required separately
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.css';
import 'froala-editor/js/plugins.pkgd.min.js';

import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import React from 'react';


class EditorComponent extends React.Component {

    constructor() {
        super();

        this.state = {
            content: '<span>Blog\'s Content</span>'
        };

        this.handleModelChange = this.handleModelChange.bind(this);
    }

    handleModelChange (model) {
        this.setState({
            content: model
        });
    }

    render () {
        return(
            <div className="sample">
                <h2></h2>
                <FroalaEditor
                    model={this.state.content}
                    onModelChange={this.handleModelChange}
                />
                {/*<h4>Rendered Content:</h4>
                <FroalaEditorView
                    model={this.state.content}
                />*/}
            </div>
        );
    }

}

export default EditorComponent;
