import dayjs from 'dayjs';
import { useState } from 'react';

import PropTypes from 'prop-types';
import {Col, Form, Row, Button} from "react-bootstrap";

function FilmForm(props){
    const {mode, cancel, addNewFilm, updateFilm, film} = props;
    //per ora implemento solo adding, poi userò stesso form per edit
    const [id, setId] = useState(film.id ? film.id : 0);
    const [title, setTitle] = useState(film.title ? film.title : "");
    const [date, setDate] = useState(film.watchDate ? film.watchDate.format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"));
    const [favorite, setFavorite] = useState(film.favorite ? film.favorite : false);
    const [rating, setRating] = useState(film.rating ? film.rating : 0);

    const handleSubmit = (event) => {
        event.preventDefault();
        const film = {id, title, favorite, rating, date};
    
        // TODO: aggiungere validazione
    
        if(mode === 'edit') {
            updateFilm(film);
        } else {
            addNewFilm(film);
        }
      }

    const Rating = ({maxStars, rating}) => {
        return [...Array(maxStars)].map(
            (el, index) => <i key={index} value={index} className={(index < rating) ? "bi bi-star-fill" : "bi bi-star"} onClick={(event) => {setRating(Number(event.target.attributes.value.value) + 1)}}/>);
    }
    
    Rating.propTypes = {
        maxStars: PropTypes.number.isRequired,
    };

    return (
        <Form className='bg-light rounded p-4' onSubmit={handleSubmit}>
            <Form.Group>
                <Row>
                    <Col xs={2}>
                        <Form.Label>Title</Form.Label>
                    </Col>
                    <Col>
                    <Form.Control type="text" required={true} minLength={2} value={title} onChange={(event) => setTitle(event.target.value)}></Form.Control>  
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col xs={2}>
                        <Form.Label>Favorite</Form.Label>
                    </Col>
                    <Col xs={2}>
                        <Form.Check value={favorite} checked={favorite} onChange={() => setFavorite(prevState => !prevState)}></Form.Check>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col xs={2}>
                        <Form.Label>Watch Date</Form.Label>
                    </Col>
                    <Col xs={2}>
                        <Form.Control type="date" value={date} onChange={(event) => setDate(event.target.value)}></Form.Control>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col xs={2}>
                        <Form.Label>Rating</Form.Label>
                    </Col>
                    <Col xs={2}>
                        <Rating maxStars={5} rating={rating}></Rating>
                    </Col>
                </Row>
            </Form.Group>

            {mode==='add' && <Button variant='success' type='submit'>Add</Button>}
            {mode==='edit' && <Button variant='success' type='submit'>Update</Button>}{' '}
            <Button variant='danger' onClick={cancel}>Cancel</Button>
        </Form>
    );
}

export default FilmForm;
