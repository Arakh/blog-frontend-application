import React from 'react';
import { Alert } from 'react-bootstrap';

const resultSearchLabel = (props) => {
    let keyword;
    let category;
    let author;
    let conjunction;

    if (props.category && props.category !=="All") {
        category = (<span><Alert.Link href='#'>"{props.category}"</Alert.Link> as Category</span>);
        conjunction = "and";
    }

    if (props.keyword) {
        keyword = (<span>{conjunction} <Alert.Link href='#'>"{props.keyword}"</Alert.Link> as Keyword</span>);
        conjunction = "and";
    }

    if (props.author) {
        author = (<span>{conjunction} <Alert.Link href='#'>"{props.author}"</Alert.Link> as Author</span>);
    }

    if (category || keyword || author) {
        return (
            <Alert variant="light">
                Showing posts related {category} {keyword} {author}
            </Alert>
        );
    }

    return (<></>);
}

export default resultSearchLabel;