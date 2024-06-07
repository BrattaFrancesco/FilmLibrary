import {Col, Row, Button} from 'react-bootstrap/';

import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import { Link } from 'react-router-dom';

import { Film } from '../films.mjs';
import API from '../API.mjs'

export function FilmLayout(props){
    const [films, setFilms] = useState(null);
    const {filter, userId} = props;
    const [filmDeletedController, setFilmDeletedController] = useState(true)

    useEffect(() => {
        setFilms(null)
        let getFilms = () => {}
        switch(filter.id){
            case 'filter-all':
                getFilms = async () => {
                    const films = (await API.getFilms(userId)).map(film => ({ ...film, deleted: false }));
                    setFilms(films);
                }
                break;
            case 'filter-favorite':
                getFilms = async () => {
                    const films = (await API.getFavoriteFilms(userId)).map(film => ({ ...film, deleted: false }));
                    setFilms(films);
                }
                break;
            case 'filter-best':
                getFilms = async () => {
                    const films = (await API.getBestFilms(userId)).map(film => ({ ...film, deleted: false }));
                    setFilms(films);
                }
                break;
            case 'filter-lastmonth':
                getFilms = async () => {
                    const films = (await API.getLastMonthFilms(userId)).map(film => ({ ...film, deleted: false }));
                    setFilms(films);
                }
                break;
            case 'filter-unseen':
                getFilms = async () => {
                    const films = (await API.getUnseenFilms(userId)).map(film => ({ ...film, deleted: false }));
                    setFilms(films);
                }
                break;
        }
        getFilms();
      }, [filter, filmDeletedController]);

    const handleDelete = async (id, userId) => {
        setFilms(oldFilms => {
            return oldFilms.map((f) => {
                if(f.id === id) {
                    f.deleted = true;
                }
                return f;
            });
        });
        await API.deleteFilm(id, userId)
           .then(() => {
                setFilmDeletedController(oldValue => !oldValue)
            })
           .catch((err) => console.log(err))
    }
    
    props.handleMode('view');
    return(<>
        <FilmList films={films} handleDelete={handleDelete} filter={filter} userId={userId}/> 
    </>);
}

function FilmList(props){
    const {films, handleDelete, filter, userId} = props;
    return (
        <>
        <h1><span id="filter-title">{filter.label}</span> films</h1>
        {!films ? (<p className='lead'>Loading films...</p>)
                : (<ListGroup id="film-list" variant="flush">
                    {films.map((film) => <FilmElement film={film} handleDelete={handleDelete} key={film.id} userId={userId}></FilmElement>)}</ListGroup>) }
        </>
    );
}

FilmList.propTypes = {
    films: PropTypes.array.isRequired,

};

function FilmElement({film, handleDelete, userId}){
    
    return (
        <ListGroupItem active={film.deleted}>
            <Row className="gy-2">
                <Col xs={2} className="d-flex gap-2 align-items-center">
                    {film.title}
                </Col>
                <Col xs={2} className="text-end text-xl-center">
                        <span className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" readOnly={true} id={film.id} checked={film.favorite}></input>
                          <label className="custom-control-label" htmlFor={film.id}>Favorite</label>
                        </span>
                </Col>
                <Col xs={2} className="text-xl-center">
                            {film.formatWatchDate()}
                </Col>
                <Col xs={3} className="d-xl-flex">
                            <div className="rating">
                                <Rating rating={film.rating} maxStars={5}></Rating>
                            </div>
                </Col>
                <Col xs={2} className='actions-container text-end'>
                    <div className="d-xl-flex actions">
                        <Link className="btn bg-light"
                              to={`/films/${film.id}/edit`}>
                                <i className="bi bi-pencil"/>
                        </Link>
                        <Button variant='light' onClick={() => handleDelete(film.id, userId)}>
                            <i className="bi bi-trash bg"/>  
                        </Button>
                    </div> 
                </Col>
            </Row>
        </ListGroupItem>
    );
}

function Rating({maxStars, rating}) {
    return [...Array(maxStars)].map(
        (el, index) => <i key={index} className={(index < rating) ? "bi bi-star-fill" : "bi bi-star"}/>);
}

Rating.propTypes = {
    maxStars: PropTypes.number.isRequired,
};

export default FilmList;
