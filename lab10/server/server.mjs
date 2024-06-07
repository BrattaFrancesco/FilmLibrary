'use strict'
import express, { response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {check, validationResult} from 'express-validator';
import { FilmLibrary } from './film-dao.mjs';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import { getUser, getUserById } from './user-dao.mjs';

// init
const app = express();
const port = 3001;
const filmLibrary = new FilmLibrary();

// middleware
app.use(express.json());
app.use(morgan('dev'));
// set up and enable CORS
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true
  };
app.use(cors(corsOptions));
  
passport.use(new LocalStrategy(async function verify(username, password, cb) {
    const user = await getUser(username, password);
    if(!user)
        return cb(null, false, 'Incorrect username or password.');
    return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (user, cb) {
    return cb(null, user);
});

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({error: 'Not authorized'});
}

app.use(session({
    secret: "ahboh",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

// ROUTES

// GET /api/films
app.get('/api/films', isLoggedIn, async (request, response) => {
    try {
        const films = await filmLibrary.getFilms(request.query.userId);
        if(films.error)
            response.status(404).json(films);
        else
            response.json(films);
    } catch {
        response.status(500).end();
    }
});

// GET /api/films/favorite
app.get('/api/films/favorite', isLoggedIn, async(req, res) => {
    try {
        const films = await filmLibrary.getFavoriteFilms(req.query.userId);
        if(films.error)
            res.status(404).json(films);
        else
            res.json(films);
    } catch {
        res.status(500).end();
    }
});

// GET /api/films/best
app.get('/api/films/best', isLoggedIn, async(req, res) => {
    try {
        const films = await filmLibrary.getFilmsWithHigherRateThan(4, req.query.userId);
        if(films.error)
            res.status(404).json(films);
        else
            res.json(films);
    } catch {
        res.status(500).end();
    }
});

// GET /api/films/last-month
app.get('/api/films/last-month', isLoggedIn, async(req, res) => {
    try {
        const films = await filmLibrary.getFilmsWatchedLastMonth(req.query.userId);
        if(films.error)
            res.status(404).json(films);
        else
            res.json(films);
    } catch {
        res.status(500).end();
    }
});

// GET /api/films/unseen
app.get('/api/films/unseen', isLoggedIn, async(req, res) => {
    try {
        const films = await filmLibrary.getUnseenFilms(req.query.userId);
        if(films.error)
            res.status(404).json(films);
        else
            res.json(films);
    } catch {
        res.status(500).end();
    }
});

// GET /api/films/<id>
app.get('/api/films/:id', isLoggedIn, async(req, res) => {
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
app.post('/api/films', isLoggedIn, [
    check('title').notEmpty(),
    check('isFavorite').isBoolean(),
    check('watchedDate').isDate({format: "YYYY-MM-DD", strictMode: true}).optional({nullable: true}),
    check('rating').isNumeric().optional({nullable: true}),
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
    } catch (error) {
        res.status(500).json({error: error});
    }
});

// PUT /api/films/4
app.put('/api/films/:id', isLoggedIn, [
    check('title').isString().optional({nullable: true}),
    check('watchedDate').isDate({format: "YYYY-MM-DD", strictMode: true}).optional({nullable: true}),
    check('userId').isNumeric().notEmpty()
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

// PUT /api/films/4/rating
app.put('/api/films/:id/rating', isLoggedIn, [
    check('rating').isNumeric(),
    check('userId').isNumeric().notEmpty()
], async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    const filmToUpdate = req.body;
    filmToUpdate.id = req.params.id;
    const filmLibrary = new FilmLibrary();

    try {
        await filmLibrary.updateFilm(filmToUpdate);
        res.status(200).end();
    } catch {
        res.status(500).json("Film not updated");
    }
});

// PUT /api/films/4/favorite
app.put('/api/films/:id/favorite', isLoggedIn, [
    check('isFavorite').isBoolean(),
    check('userId').isNumeric().notEmpty()
], async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    const filmToUpdate = req.body;
    filmToUpdate.id = req.params.id;
    const filmLibrary = new FilmLibrary();

    try {
        await filmLibrary.updateFilm(filmToUpdate);
        res.status(200).end();
    } catch {
        res.status(500).json("Film not updated");
    }
});

// DELETE /api/films/:id
app.delete('/api/films/:id', async (req, res) => {
    try {
        const films = await filmLibrary.deleteFilmById(req.params.id, req.query.userId);
        if(films.error)
            res.status(404).json(films);
        else
            res.json(films);
    } catch {
        res.status(500).end();
    }
});

// POST /api/session
app.post('/api/session', function(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if(err)
            return next(err);
        if (!user) {
            return res.status(401).send(info);
        }
        req.login(user, (err) => {
            if(err)
                return next(err);
            return res.status(201).json(req.user)
        });
    })(req, res, next);
});

// GET /api/session/current
app.get('/api/session/current', (req, res) => {
    if(req.isAuthenticated()){
        res.json(req.user);
    }else{
        res.status(401).json({error: 'Not authenticated'});
    }
});

// DELETE /api/session/current
app.delete('/api/session/current', (req, res) => {
    req.logout(() => {
        res.end();
    });
});

// start server
app.listen(port, () => { console.log(`API server started at http://localhost:${port}`); });