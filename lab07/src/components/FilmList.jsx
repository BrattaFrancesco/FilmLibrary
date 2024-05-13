import dayjs from 'dayjs';
import {Col, Row} from 'react-bootstrap/';

import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from "react-bootstrap";

function FilmList(props){
    const {films} = props;

    return (
        <ListGroup id="film-list" variant="flush">
            {films.map((film) => <FilmElement film={film} key={film.id}></FilmElement>)}
        </ListGroup>
    );
}

FilmList.propTypes = {
    films: PropTypes.array.isRequired
};

function FilmElement({film}){

    return (
        <ListGroupItem>
            <Row className="gy-2">
                <Col xs={2} className="d-flex gap-2 align-items-center">
                    {film.title}
                </Col>
                <Col xs={2} className="text-end text-xl-center">
                        <span className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id={film.id} defaultChecked={film.favorite}></input>
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
                            <i className="bi bi-pencil"></i>
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
