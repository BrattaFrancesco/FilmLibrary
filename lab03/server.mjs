'use strict'
import express, { response } from 'express';
import morgan from 'morgan';
import {check, validationResult} from 'express-validator';
import { FilmLibrary } from './dao.mjs';

// init
const app = express();
const port = 3001;
const filmLibrary = new FilmLibrary();

// middleware
app.use(express.json());
app.use(morgan('dev'));

// ROUTES

// GET /api/films
app.get('/api/films', async (request, response) => {
    try {
        const films = await filmLibrary.getFilms();
        if(films.error)
            response.status(404).json(films);
        else
            response.json(films);
    } catch {
        response.status(500).end();
    }
});

// GET /api/films/favorite
app.get('/api/films/favorite', async(req, res) => {
    try {
        const films = await filmLibrary.getFavoriteFilms();
        if(films.error)
            res.status(404).json(films);
        else
            res.json(films);
    } catch {
        res.status(500).end();
    }
});

// GET /api/films/best
app.get('/api/films/best', async(req, res) => {
    try {
        const films = await filmLibrary.getFilmsWithHigherRateThan(4);
        if(films.error)
            res.status(404).json(films);
        else
            res.json(films);
    } catch {
        res.status(500).end();
    }
});

// GET /api/films/last-month
app.get('/api/films/last-month', async(req, res) => {
    try {
        const films = await filmLibrary.getFilmsWatchedLastMonth();
        if(films.error)
            res.status(404).json(films);
        else
            res.json(films);
    } catch {
        res.status(500).end();
    }
});

// GET /api/films/unseen
app.get('/api/films/unseen', async(req, res) => {
    try {
        const films = await filmLibrary.getUnseenFilms();
        if(films.error)
            res.status(404).json(films);
        else
            res.json(films);
    } catch {
        res.status(500).end();
    }
});

// GET /api/films/<id>
app.get('/api/films/:id', async(req, res) => {
    try {
        const films = await filmLibrary.getFilmById(req.params.id);
        if(films.error)
            res.status(404).json(films);
        else
            res.json(films);
    } catch {
        res.status(500).end();
    }
});

// POST /api/films
app.post('/api/films', [
    check('title').notEmpty(),
    check('isFavorite').isBoolean(),
    check('watchedDate').isDate({format: "YYYY-MM-DD", strictMode: true}).optional({nullable: true}),
    check('rating').isNumeric(),
    check('userId').isNumeric()
], async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    const filmToAdd = req.body;
    const filmLibrary = new FilmLibrary();

    try {
        await filmLibrary.addFilm(filmToAdd);
        res.status(201).end();
    } catch {
        res.status(500).json("Film not created");
    }
});

// PUT /api/films/4
app.put('/api/films/:id', [
    check('title').isString().optional({nullable: true}),
    check('watchedDate').isDate({format: "YYYY-MM-DD", strictMode: true}).optional({nullable: true}),
], async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    const filmToUpdate = req.body;
    filmToUpdate.id = req.params.id;
    console.log(filmToUpdate)
    const filmLibrary = new FilmLibrary();

    try {
        await filmLibrary.updateFilm(filmToUpdate);
        res.status(200).end();
    } catch {
        res.status(500).json("Film not pdated");
    }
});

// PUT /api/films/4
app.put('/api/films/:id/rating', [
    check('rating').isEmpty()
], async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    const filmToUpdate = req.body;
    filmToUpdate.id = req.params.id;
    console.log(filmToUpdate)
    const filmLibrary = new FilmLibrary();

    try {
        await filmLibrary.updateFilm(filmToUpdate);
        res.status(200).end();
    } catch {
        res.status(500).json("Film not updated");
    }
});
// start server
app.listen(port, () => { console.log(`API server started at http://localhost:${port}`); });