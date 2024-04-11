'use strict'
import dayjs from "dayjs";

function Film(id, title, isFavourite = false, watchedDate = 0, rating = 0, userId = 1){
    this.id = id;
    this.title = title;
    this.isFavourite = isFavourite;
    this.watchedDate = dayjs(watchedDate);
    this.rating = rating;
    this.userId = userId;
}

function FilmLibrary(){
    this.filmList = [];

    this.addNewFil = (film) => {
        this.filmList.push(film);
    };
}

console.log("Adding film to the library...");
let filmLibrary = new FilmLibrary();
filmLibrary.addNewFil(new Film(1, "Pulp Fiction", true, "March 10, 2024", 5, 1 ));
filmLibrary.addNewFil(new Film(2, "21 Grams", true, "March 17, 2024", 4, 1));
filmLibrary.addNewFil(new Film(3, "Star Wars", false, null, 0, 1 ));
filmLibrary.addNewFil(new Film(4, "Matrix", false, null, 0, 1 ));
filmLibrary.addNewFil(new Film(5, "Shrek", false, "March 21, 2024", 3, 1 ));

console.log("List of films:");
for(let film of filmLibrary.filmList){
    console.log(film.id, film.title, film.isFavourite, film.watchedDate.format("YYYY-MM-DD"), film.rating, film.userId);
}

