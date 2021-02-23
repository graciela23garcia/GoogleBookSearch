import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Button, Container } from "react-bootstrap";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Search() {
    // Setting our component's initial state
    const [books, setBooks] = useState([])
    const [formObject, setFormObject] = useState({})
    const [bookResults, setBookResults] = useState({})

    //functon to save books
    function bookSave(id, title, authors, description, image, link) {

        // event.preventDefault();
        API.bookSave({
            key: id,
            title: title,
            authors: authors,
            description: description,
            image: image,
            link: link
        })
            .then(res => console.log())
            .catch(err => console.log(err));
    }
    // Deletes a book from the database with a given id, then reloads books from the db
    function deleteBook(id) {
        API.deleteBook(id)
            .then(res => loadBooks())
            .catch(err => console.log(err));
    }

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    function handleFormSubmit(event) {
        event.preventDefault();
        API.searchBook(formObject.title)
            .then(res => {
                console.log(res.data.items)
                setBookResults(res.data.items)
            })
            .catch(err => console.log(err));
    };

    return (
        <Container fluid>
            <Row>
                <Col size="md-6">
                    <Jumbotron>
                        <h1>What Books Should I Read?</h1>
                    </Jumbotron>
                    <form>
                        <Input
                            onChange={handleInputChange}
                            name="title"
                            placeholder="Title (required)"
                        />
                        <FormBtn
                            disabled={!(formObject.author && formObject.title)}
                            onClick={handleFormSubmit}
                        >
                            Submit Book
              </FormBtn>
                    </form>
                </Col>
                <Col size="md-6 sm-12">
                    <Jumbotron>
                        <h1>Book Results</h1>
                    </Jumbotron>
                    {bookResults.length ? (
                        <List>
                            {bookResults.map((book) => { 
                                {resultBooks.map((book) => {
                                    let id = "";
                                    id = book.id;
                                    let title = "";
                                    if (book.volumeInfo.title === undefined) {
                                      title = "No Title";
                                    } else {
                                      title = book.volumeInfo.title;
                                    }
                                    let authors = [];
                                    if (book.volumeInfo.authors === undefined) {
                                      authors = ["No Author"];
                                    } else {
                                      authors = book.volumeInfo.authors;
                                    }
                                    let description = "";
                                    if (book.volumeInfo.description) {
                                      description = book.volumeInfo.description;
                                    } else {
                                      description = "No description.";
                                    }
                                    let image = "";
                                    if (book.volumeInfo.imageLinks === undefined) {
                                      image = "No Image";
                                    } else {
                                      image = book.volumeInfo.imageLinks.thumbnail;
                                <ListItem key={book._id}>
                                    <Link to={"/books/" + book._id}>
                                        <strong>
                                            {book.title} by {book.author}
                                        </strong>
                                    </Link>
                                    <DeleteBtn onClick={() => deleteBook(book._id)} />
                                </ListItem>
                            )}
                        </List>
                    ) : (
                            <h3>No Results to Display</h3>
                        )}
                </Col>
            </Row>
        </Container>
    );
}


export default Search;
