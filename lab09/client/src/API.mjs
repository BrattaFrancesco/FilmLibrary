import { Film } from './films.mjs';

const SERVER_URL = 'http://localhost:3001';

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

const API = { getFilms, getFavoriteFilms, getBestFilms, getLastMonthFilms, getUnseenFilms };
export default API;
