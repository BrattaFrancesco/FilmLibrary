import dayjs from 'dayjs';
import { useState } from 'react';

import PropTypes from 'prop-types';
import {Col, Form, Row, Button} from "react-bootstrap";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Film } from '../films.mjs';

export function AddEditFilmLayout(props){
    let film = new Film()
    if(props.m === 'edit'){
        const {id} = useParams();
        film = props.films.find((f) =>{
            if(f.id === Number(id)) {
                return new Film(f.id, f.title, f.favorite, f.date, f.rating, 0);
            }
        })
    }
    props.handleMode(props.m)
    
    return(<>
        <FilmForm mode = {props.m} handleMode={props.handleMode} addNewFilm={props.addNewFilm} updateFilm={props.updateFilm} film={film}/>
    </>);
}

function FilmForm({mode, addNewFilm, updateFilm, film, handleMode}){
    const navigate = useNavigate();
    const [id, setId] = useState(film ? film.id : 0);
    const [title, setTitle] = useState(film ? film.title : "");
    const [date, setDate] = useState(film.watchDate ? film.watchDate.format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"));
    const [favorite, setFavorite] = useState(film ? film.favorite : false);
    const [rating, setRating] = useState(film ? film.rating : 0);

    const handleSubmit = (event) => {
        event.preventDefault();
        const film = {id, title, favorite, rating, date};
    
        // TODO: aggiungere validazione
    
        if(mode === 'edit') {
            updateFilm(film);
        } else {
            addNewFilm(film);
        }
        navigate(-1);
      }

    const Rating = ({maxStars, rating}) => {
        return [...Array(maxStars)].map(
            (el, index) => <i key={index} value={index} className={(index < rating) ? "bi bi-star-fill" : "bi bi-star"} onClick={(event) => {setRating(Number(event.target.attributes.value.value) + 1)}}/>);
    }
    
    Rating.propTypes = {
        maxStars: PropTypes.number.isRequired,
    };

    return (
        <>
        {mode==='add' && <h1>Add film</h1>}
        {mode==='edit' && <h1>Edit film</h1>}
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
            <Link className='btn btn-danger' onClick={() => { handleMode('view'); navigate(-1);}}>Cancel</Link>
        </Form>
        </>
    );
}

FilmForm.propTypes = {
    modeForm : PropTypes.string, 
    addNewFilm : PropTypes.func, 
    updateFilm : PropTypes.func, 
    film : PropTypes.object, 
    setView : PropTypes.func
}


export default FilmForm;
