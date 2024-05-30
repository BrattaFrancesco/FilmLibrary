import { Film } from './films.mjs';

const SERVER_URL = 'http://localhost:3001';

const getFilm = async (id) => {
    const response = await fetch(SERVER_URL + "/api/films/" + id);
    if(response.ok){
        const filmJson = await response.json();
        return filmJson.map(f => new Film(f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId));
    }
    else
        throw new Error('Internal server error');
}

const getFilms = async () => {
    const response = await fetch(SERVER_URL + '/api/films');
    if(response.ok) {
        const filmJson = await response.json();
        return filmJson.map(f => new Film(f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId));
    }
    else
        throw new Error('Internal server error');
}

const getFavoriteFilms = async () => {
    const response = await fetch(SERVER_URL + '/api/films/favorite');
    if(response.ok) {
        const filmJson = await response.json();
        return filmJson.map(f => new Film(f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId));
    }
    else
        throw new Error('Internal server error');
}

const getBestFilms = async () => {
    const response = await fetch(SERVER_URL + '/api/films/best');
    if(response.ok) {
        const filmJson = await response.json();
        return filmJson.map(f => new Film(f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId));
    }
    else
        throw new Error('Internal server error');
}

const getLastMonthFilms = async () => {
    const response = await fetch(SERVER_URL + '/api/films/last-month');
    if(response.ok) {
        const filmJson = await response.json();
        return filmJson.map(f => new Film(f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId));
    }
    else
        throw new Error('Internal server error');
}

const getUnseenFilms = async () => {
    const response = await fetch(SERVER_URL + '/api/films/unseen');
    if(response.ok) {
        const filmJson = await response.json();
        return filmJson.map(f => new Film(f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId));
    }
    else
        throw new Error('Internal server error');
}

const addFilm = async (film) => {
    const response = await fetch(SERVER_URL + '/api/films', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title:film.title, isFavorite:film.favorite, rating:film.rating, watchDate:film.watchDate, userId: film.userId})
    })
    if(!response.ok){
        const errMessage = await response.json();
        throw errMessage;
    }else return null;

}

const API = { getFilm, getFilms, getFavoriteFilms, getBestFilms, getLastMonthFilms, getUnseenFilms, addFilm };
export default API;
