import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import {Col, Form, Row, Button} from "react-bootstrap";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Film } from '../films.mjs';
import API from '../API.mjs';

export function AddEditFilmLayout(props){
    const [film, setFilm] = useState(null)
    const {id} = useParams();

    if(props.m === 'edit'){
        useEffect(() => {
            let getFilm = async () => {
                const film = await API.getFilm(id)
                setFilm(film[0]);
            }
            getFilm();
        }, [])
    }
        
    props.handleMode(props.m);
    return(<>
        {props.m === 'add' ? <FilmForm mode = {props.m} handleMode={props.handleMode} film={film} />
                        : film ? <FilmForm mode = {props.m} handleMode={props.handleMode} film={film} />
                               : <p className='lead'>Loading film...</p> }
    </>);
}

function FilmForm({mode, film, handleMode}){
    const navigate = useNavigate();
    const [id, setId] = useState(film ? film.id : 0);
    const [title, setTitle] = useState(film ? film.title : "");
    const [watchDate, setWatchDate] = useState(film?.watchDate ? film.watchDate.format("YYYY-MM-DD") : null);
    const [favorite, setFavorite] = useState(film ? film.favorite : false);
    const [rating, setRating] = useState(film ? film.rating : 0);

    const handleSubmit = (event) => {
        event.preventDefault();
        const film = {id, title, favorite, rating, watchDate, userId:1};
    
        // TODO: aggiungere validazione
        
        if(mode === 'edit') {
            API.updateFilm(film)
               .then(() => navigate(-1))
               .catch((err) => console.log(err))
        } else {
            API.addFilm(film)
               .then(() => navigate(-1))
               .catch((err) => console.log(err))
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
                        <Form.Control type="date" value={watchDate} onChange={(event) => setWatchDate(event.target.value)}></Form.Control>
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
