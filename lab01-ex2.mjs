'use strict'
import dayjs from "dayjs";

function Film(id, title, isFavourite = false, watchedDate = null, rating = 0, userId = 1){
    this.id = id;
    this.title = title;
    this.isFavourite = isFavourite;
    this.watchedDate = watchedDate && dayjs(watchedDate);
    this.rating = rating;
    this.userId = userId;

    this.toString = () => {
        return `Id: ${this.id}, ` +
        `Title: ${this.title}, Favorite: ${this.isFavorite}, ` +
        `Watch date: ${this.watchedDate}, Score: ${this.rating}, ` +
        `User: ${this.userId}`;
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
}

console.log("Adding film to the library...");
const filmLibrary = new FilmLibrary();
filmLibrary.addNewFil(new Film(1, "Pulp Fiction", true, "March 10, 2024", 5, 1 ));
filmLibrary.addNewFil(new Film(2, "21 Grams", true, "March 17, 2024", 4, 1));
filmLibrary.addNewFil(new Film(3, "Star Wars", false, null, 0, 1 ));
filmLibrary.addNewFil(new Film(4, "Matrix", false, null, 0, 1 ));
filmLibrary.addNewFil(new Film(5, "Shrek", false, "March 21, 2024", 3, 1 ));

console.log("**Sorting by date**");
const sortedFilms = filmLibrary.sortByDate();
for(const film of sortedFilms){
    console.log(film.toString());
}

//not working, maybe async problems?
console.log("**Delete film 3**");
filmLibrary.deleteFilm(3);
for(const film of filmLibrary.filmList){
    console.log(film.toString());
}

console.log("**Reset wathced dates**");
filmLibrary.resetWatchedFilms();
for(const film of filmLibrary.filmList){
    console.log(film.toString());
}

console.log("**Rating filtered**")
let rated = filmLibrary.getRated();
for(const film of rated){
    console.log(film.toString());
}