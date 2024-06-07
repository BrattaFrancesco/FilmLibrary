import { Film } from './films.mjs';

const SERVER_URL = 'http://localhost:3001';

const getFilm = async (id) => {
    const response = await fetch(SERVER_URL + "/api/films/" + id, {
        credentials: 'include',
    });
    if(response.ok){
        const filmJson = await response.json();
        return filmJson.map(f => new Film(f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId));
    }
    else
        throw new Error('Internal server error');
}

const getFilms = async (userId) => {
    const response = await fetch(SERVER_URL + '/api/films?userId=' + userId, {
        credentials: 'include',
    });
    if(response.ok) {
        const filmJson = await response.json();
        return filmJson.map(f => new Film(f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId));
    }
    else
        throw new Error('Internal server error');
}

const getFavoriteFilms = async (userId) => {
    const response = await fetch(SERVER_URL + '/api/films/favorite?userId=' + userId, {
        credentials: 'include',
    });
    if(response.ok) {
        const filmJson = await response.json();
        return filmJson.map(f => new Film(f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId));
    }
    else
        throw new Error('Internal server error');
}

const getBestFilms = async (userId) => {
    const response = await fetch(SERVER_URL + '/api/films/best?userId=' + userId, {
        credentials: 'include',
    });
    if(response.ok) {
        const filmJson = await response.json();
        return filmJson.map(f => new Film(f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId));
    }
    else
        throw new Error('Internal server error');
}

const getLastMonthFilms = async (userId) => {
    const response = await fetch(SERVER_URL + '/api/films/last-month?userId=' + userId, {
        credentials: 'include',
    });
    if(response.ok) {
        const filmJson = await response.json();
        return filmJson.map(f => new Film(f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId));
    }
    else
        throw new Error('Internal server error');
}

const getUnseenFilms = async (userId) => {
    const response = await fetch(SERVER_URL + '/api/films/unseen?userId=' + userId, {
        credentials: 'include',
    });
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
        body: JSON.stringify({title:film.title, isFavorite:film.favorite, rating:film.rating, watchDate:film.watchDate, userId: film.userId}),
        credentials: 'include',
    })
    if(!response.ok){
        const errMessage = await response.json();
        throw errMessage;
    }else return null;

}

const updateFilm = async (film) => {
    const response = await fetch(SERVER_URL + '/api/films/' + film.id, {
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title:film.title, isFavorite:film.favorite, rating:film.rating, watchDate:film.watchDate, userId: film.userId}),
        credentials: 'include',
    })
    if(!response.ok){
        const errMessage = await response.json();
        throw errMessage;
    }else return null;

}

const deleteFilm = async (id, userId) => {
    const response = await fetch(SERVER_URL + '/api/films/' + id + '?userId=' + userId, {
        method:'DELETE',
        credentials: 'include',
    })
    if(!response.ok){
        const errMessage = await response.json();
        throw errMessage;
    }else return null;
}

const logIn = async (credentials) => {
    const response = await fetch(SERVER_URL + '/api/session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
    });
    if(response.ok) {
        const user = await response.json();
        return user;
    }else{
        const err = await response.text();
        throw err;
    }
};

const getUserInfo = async () => {
    const response = await fetch(SERVER_URL + '/api/session/current', {
        credentials: 'include',
    });
    const user = await response.json();
    if (response.ok) {
        return user;
    }else{
        throw user;
    }
};

const logOut = async () => {
    const response = await fetch(SERVER_URL + '/api/session/current', {
        method: 'DELETE',
        credentials: 'include',
    });
    if(response.ok){
        return null;
    }
}

const API = { getFilm, getFilms, getFavoriteFilms, getBestFilms, getLastMonthFilms, getUnseenFilms, addFilm, updateFilm, deleteFilm,
    logIn, logOut, getUserInfo
 };
export default API;
