'use strict'
import sqlite from "sqlite3";
import { Film } from "./Film.mjs";
import dayjs from "dayjs";

const db = new sqlite.Database("../../data/films.sqlite", (err) => {
    if(err) throw err;
});

export function FilmLibrary(){
    /*
    a. Retrieve all the stored films and return a Promise that resolves to an array of Film objects. 
   */
    this.getFilms = (userId) => {
        return new Promise((resolve, reject) =>{
            const sql = "SELECT * FROM films WHERE userId = ?";
            db.all(sql, [userId], (err, rows) =>{
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
    this.getFavoriteFilms = (userId) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE isFavorite = True AND userId = ?";
            db.all(sql, [userId], (err, rows) => {
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
  this.getFilmsWatchedToday = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM films WHERE watchDate = ? AND userId = ?";
        db.all(sql, [dayjs().format("YYYY-MM-DD"), userId], (err, rows) => {
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
    c. Retrieve all films watched last month and return a Promise that resolves to an array of Film objects. 
   */
    this.getFilmsWatchedLastMonth = (userId) => {
      return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM films WHERE watchDate >= ? AND userId = ?";
          db.all(sql, [dayjs().startOf('month').format("YYYY-MM-DD"), userId], (err, rows) => {
              if(err){
                  reject(err);
              }else if(rows !== undefined){
                  resolve(rows.map((f) => new Film(f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId)));
              }else{
                  resolve("No films watched in the last month");
              }
          });
      })
    }

   /* 
    d. Retrieve films whose watch date is earlier than a given date (received as a parameter). 
       Return a Promise that resolves to an array of Film objects. 
   */
  this.getFilmsPreviousWatched = (date, userId) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM films WHERE watchDate < ? AND userId = ?";
        db.all(sql, [date.format("YYYY-MM-DD"), userId], (err, rows) => {
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
    d. Retrieve films never watched
       Return a Promise that resolves to an array of Film objects. 
   */
       this.getUnseenFilms = (userId) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE watchDate IS NULL AND userId = ?";
            db.all(sql, [userId], (err, rows) => {
                if(err){
                    reject(err);
                }else if(rows !== undefined){
                    resolve(rows.map((f) => new Film(f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId)));
                }else{
                    resolve("No films not watched");
                }
            });
        })
      }

   /* 
    e. Retrieve films whose rating is greater than or equal to a given number (received as a parameter).
       Return a Promise that resolves to an array of Film objects. 
   */
  this.getFilmsWithHigherRateThan = (rate, userId) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM films WHERE rating > ? AND userId = ?";
        db.all(sql, [rate, userId], (err, rows) => {
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
  this.getFilmsTitleContains = (keyWord, userId) => {
    keyWord = `%${keyWord.toLowerCase()}%`;
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM films WHERE title LIKE ? AND userId = ?";
        db.all(sql, [keyWord, userId], (err, rows) => {
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

  /* 
    f. Retrieve films by id. 
       Return a Promise that resolves to an array of Film objects. 
   */
       this.getFilmById = (id) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM films WHERE id = ?";
            db.all(sql, [id], (err, rows) => {
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

  /*
  a. Store a new movie into the database. After completion, print a confirmation/failure message. 
  */
  this.addFilm = (film) => {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM films WHERE title = ? AND userId = ?';
      db.get(sql, [film.title, film.userId], (err, row) => {
        if (err) {
          reject(err);
        } else if (row === undefined) {
          sql = 'INSERT INTO films(title, isFavorite, rating, watchDate, userID) VALUES(?,?,?,DATE(?),?)';
          db.run(sql, [film.title, film.isFavorite, film.rating, film.watchDate, film.userId], (err) => {
            if (err){
              reject(err);
            }else{
              resolve("Film inserted.");
            }
          });
        } else{
          resolve("Film not insertable, check the used title.");
        }
      });
    });
  }

  /*
  a. Store a new movie into the database. After completion, print a confirmation/failure message. 
  */
  this.updateFilm = (film) => {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM films WHERE id = ? AND userId = ?';
      db.get(sql, [film.id, film.userId], (err, row) => {
        if (err) {
          reject(err);
        } else if (row !== undefined) {
          sql = 'UPDATE films SET title = ?, isFavorite = ?, watchDate = DATE(?), rating = ? WHERE id = ? AND userId = ?';
          
          if(film.title === undefined)
            film.title = row.title;
          if(film.watchDate === undefined)
            film.watchDate = row.watchDate;
          if(film.isFavorite === undefined)
            film.isFavorite = row.isFavorite;
          if(film.rating === undefined)
            film.rating = row.rating;
          
          db.run(sql, [film.title, film.isFavorite, film.watchDate, film.rating, film.id, film.userId], (err) => {
            if (err){
              reject(err);
            }else{
              resolve("Film updated.");
            }
          });
        } else{
          resolve("Film not updatable, check the used id.");
        }
      });
    });
  }

  /*
  b. Delete a movie from the database (using its ID as a reference). 
     After completion, print a confirmation/failure message. 
  */
this.deleteFilm = (film) => {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM films WHERE title = ? AND userId = ?';
      db.get(sql, [film.title, film.userId], (err, row) => {
        if (err) {
          reject(err);
        } else if (row !== undefined) {
          sql = 'DELETE FROM films WHERE title = ? AND userId = ?';
          db.run(sql, [film.title, film.userId], (err) => {
            if (err){
              reject(err);
            }else{
              resolve("Film deleted.");
            }
          });
        } else{
          resolve("Film not present, check the used title.");
        }
      });
    });
  }

   /*
  b. Delete a movie from the database (using its ID as a reference). 
     After completion, print a confirmation/failure message. 
  */
this.deleteFilmById = (id, userId) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM films WHERE id = ? AND userId = ?';
    db.get(sql, [id, userId], (err, row) => {
      if (err) {
        reject(err);
      } else if (row !== undefined) {
        sql = 'DELETE FROM films WHERE id = ? AND userId = ?';
        db.run(sql, [id, userId], (err) => {
          if (err){
            reject(err);
          }else{
            resolve("Film deleted.");
          }
        });
      } else{
        resolve("Film not present, check the used id.");
      }
    });
  });
}

  /*
  c. Delete the watch date of all films stored in the database. 
     After completion, print a confirmation/failure message. 
  */
 this.deleteWathcedDates = (userId) => {
    return new Promise((resolve, reject) => {
      let sql = 'UPDATE films SET watchDate = null WHERE userId = ?';
      db.run(sql, [userId], (err) => {
        if (err){
            reject(err);
        }else{
            resolve("Watched dates deleted.");
        }
      });
    });
  }
}