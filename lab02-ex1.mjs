'use strict'
import { rejects } from "assert";
import dayjs from "dayjs";
import { resolve } from "path";
import sqlite from "sqlite3";

const db = new sqlite.Database("data/films.sqlite", (err) => {
    if(err) throw err;
});

function Film(id, title, isFavorite = false, watchedDate = null, rating = 0, userId = 1){
    this.id = id;
    this.title = title;
    this.isFavorite = isFavorite;
    this.watchedDate = watchedDate && dayjs(watchedDate);
    this.rating = rating;
    this.userId = userId;

    this.toString = () => {
        return `Id: ${this.id}, ` +
        `Title: ${this.title}, isFavorite: ${this.isFavorite}, ` +
        `WatchedDate: ${this.watchedDate}, Rating: ${this.rating}, ` +
        `UserId: ${this.userId}`;
    }
}

function FilmLibrary(){
    this.filmList = [];

    this.addNewFil = (film) => {
        this.filmList.push(film);
    };

    /*function(o1,o2){
        if (sort_o1_before_o2)    return -1;
        else if(sort_o1_after_o2) return  1;
        else                      return  0;
     */
    this.sortByDate = () => {
        let arrayToSort = [...this.filmList];
        arrayToSort.sort((f1, f2) =>{
            //check if falsy
            if(!(f1.watchedDate)) return 1;
            if(!(f2.watchedDate)) return -1;
            return f1.watchedDate.diff(f2.watchedDate);
            //return f1.watchedDate.isAfter(f2.watchedDate) ? 1 : -1;
        });
        return arrayToSort;
    }

    this.deleteFilm = (id) => {
        this.filmList = this.filmList.filter((film, index, arr) => {
            return film.id !== id;
        });
    }

    this.resetWatchedFilms = () => {
        this.filmList.forEach((film) => {delete film.watchedDate});
    }

    this.getRated = () => {
        let filtered = this.filmList.filter((film, index, arr) => {
            return film.rating > 0;
        });

        return filtered.sort((f1, f2) =>{
            return f1.rating > f2.rating;
        });
    } 

    /*
    a. Retrieve all the stored films and return a Promise that resolves to an array of Film objects. 
   */
    this.getFilms = () => {
        return new Promise((resolve, reject) =>{
            const sql = "SELECT * FROM films";
            db.all(sql, (err, rows) =>{
                if(err){
                    reject(err);
                }else if(rows !== undefined){
                    resolve(rows.map((f) => new Film(f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId)));
                }else{
                    resolve("Films library empty.")
                }
            });
        });
    }

   /*
    b. Retrieve all favorite films and return a Promise that resolves to an array of Film objects. 
   */
    this.getFavoriteFilms = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE isFavorite = True";
            db.all(sql, (err, rows) => {
                if(err){
                    reject(err);
                }else if(rows !== undefined){
                    resolve(rows.map((f) => new Film(f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId)));
                }else{
                    resolve("No favorite films present");
                }
            });
        });
    }

   /*
    c. Retrieve all films watched today and return a Promise that resolves to an array of Film objects. 
   */
  this.getFilmsWatchedToday = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM films WHERE watchDate = ?";
        db.all(sql, [dayjs().format("YYYY-MM-DD")], (err, rows) => {
            if(err){
                reject(err);
            }else if(rows !== undefined){
                resolve(rows.map((f) => new Film(f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId)));
            }else{
                resolve("No films watched today");
            }
        });
    })
  }

   /* 
    d. Retrieve films whose watch date is earlier than a given date (received as a parameter). 
       Return a Promise that resolves to an array of Film objects. 
   */
  this.getFilmsPreviousWatched = (date) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM films WHERE watchDate < ?";
        db.all(sql, [date.format("YYYY-MM-DD")], (err, rows) => {
            if(err){
                reject(err);
            }else if(rows !== undefined){
                resolve(rows.map((f) => new Film(f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId)));
            }else{
                resolve("No films watched in the previous days");
            }
        });
    })
  }

   /* 
    e. Retrieve films whose rating is greater than or equal to a given number (received as a parameter).
       Return a Promise that resolves to an array of Film objects. 
   */
  this.getFilmsWithHigherRateThan = (rate) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM films WHERE rating > ?";
        db.all(sql, [rate], (err, rows) => {
            if(err){
                reject(err);
            }else if(rows !== undefined){
                resolve(rows.map((f) => new Film(f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId)));
            }else{
                resolve("No films watched with higher rate");
            }
        });
    })
  }
   /* 
    f. Retrieve films whose title contains a given string (received as a parameter). 
       Return a Promise that resolves to an array of Film objects. 
   */
  this.getFilmsTitleContains = (keyWord) => {
    keyWord = `%${keyWord.toLowerCase()}%`;
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM films WHERE title LIKE ?";
        db.all(sql, [keyWord], (err, rows) => {
            if(err){
                reject(err);
            }else if(rows !== undefined){
                resolve(rows.map((f) => new Film(f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId)));
            }else{
                resolve("No corresponding films");
            }
        });
    })
  }
}

async function main(){
    const filmLib = new FilmLibrary();

    //const filmList = await filmLib.getFilms();
    //const filmList = await filmLib.getFavoriteFilms();
    //const filmList = await filmLib.getFilmsWatchedToday();
    //const filmList = await filmLib.getFilmsPreviousWatched(dayjs());
    //const filmList = await filmLib.getFilmsWithHigherRateThan(4);
    const filmList = await filmLib.getFilmsTitleContains("pulp");
    if(typeof filmList === 'string')
        console.log(filmList);

    for(let film of filmList){
        console.log(film.toString());
    }
}

main();