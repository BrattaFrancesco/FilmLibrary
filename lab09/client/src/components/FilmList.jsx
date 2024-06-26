import {Col, Row} from 'react-bootstrap/';

import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import { Link } from 'react-router-dom';

import { Film } from '../films.mjs';
import API from '../API.mjs'

export function FilmLayout(props){
    const [films, setFilms] = useState([]);
    const { handleUpdate, filter} = props;

    useEffect(() => {
        let getFilms = () => {}
        switch(filter.id){
            case 'filter-all':
                getFilms = async () => {
                    const films = await API.getFilms();;
                    setFilms(films);
                }
                break;
            case 'filter-favorite':
                getFilms = async () => {
                    const films = await API.getFavoriteFilms();
                    setFilms(films);
                }
                break;
            case 'filter-best':
                getFilms = async () => {
                    const films = await API.getBestFilms();
                    setFilms(films);
                }
                break;
            case 'filter-lastmonth':
                getFilms = async () => {
                    const films = await API.getLastMonthFilms();
                    setFilms(films);
                }
                break;
            case 'filter-unseen':
                getFilms = async () => {
                    const films = await API.getUnseenFilms();
                    setFilms(films);
                }
                break;
        }
        getFilms();
      }, [filter]);
      
    
    props.handleMode('view');
    return(<>
        <FilmList films={films} handleUpdate={handleUpdate} filter={filter}></FilmList>
    </>);
}

function FilmList(props){
    const {films, handleUpdate, filter} = props;

    return (
        <>
        <h1><span id="filter-title">{filter.label}</span> films</h1>
        <ListGroup id="film-list" variant="flush">
            {films.map((film) => <FilmElement film={film} handleUpdate={handleUpdate} key={film.id}></FilmElement>)}
        </ListGroup>
        </>
    );
}

FilmList.propTypes = {
    films: PropTypes.array.isRequired,

};

function FilmElement({film, handleUpdate}){

    return (
        <ListGroupItem>
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
                        <Link className="btn"
                              to={`/films/${film.id}/edit`}>
                                <i className="bi bi-pencil"/>
                        </Link>
                        <i className="bi bi-trash"></i>
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
