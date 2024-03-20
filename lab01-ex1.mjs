'use strict'

function Film(id, title, isFavourite = false, watchedDate = 0, rating = 0, userId = 1){
    this.id = id;
    this.title = title;
    this.isFavourite = isFavourite;
    this.watchedDate = watchedDate;
    this.rating = rating;
    this.userId = userId;
}

function FilmLibrary(){
    this.filmList = [];

    this.addNewFil = (film) => {
        
    };
}