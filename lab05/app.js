'use strict'

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

    this.addNewFilm = (film) => {
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
        let filtered = [...this.filmList.filter((film, index, arr) => {
            return film.rating > 0;
        })];

        return filtered.sort((f1, f2) =>{
            return f1.rating > f2.rating;
        });
    } 

    this.init = () => {
        this.filmList.push(
            new Film(1, "Pulp Fiction", true, "April 10, 2024", 5, 1 ),
            new Film(2, "21 Grams", true, "March 17, 2024", 4, 1),
            new Film(3, "Star Wars", false, null, 0, 1 ),
            new Film(4, "Matrix", false, null, 0, 1 ),
            new Film(5, "Shrek", false, "March 21, 2024", 3, 1 )
        );
    }
}

function createFilmLiElement(film){
    const li = document.createElement('li');
    li.classList.add('list-group-item');

    const divRow = document.createElement('div');
    divRow.classList.add('row', 'gy-2');
    divRow.setAttribute('id', `film-${film.id}`);
    li.appendChild(divRow);

    const divTitle = document.createElement('div');
    divTitle.classList.add('col-6', 'col-xl-3', 'favorite-title', 'd-flex', 'gap-2', 'align-items-center');
    divTitle.innerText = film.title;
    divRow.appendChild(divTitle); 

    const divFav = document.createElement('div');
    divFav.classList.add('col-6', 'col-xl-3', 'text-end', 'text-xl-center');
        const spanFav = document.createElement('span');
        spanFav.classList.add('custom-control', 'custom-checkbox');
            const inputFav = document.createElement('input');
            inputFav.type = 'checkbox';
            inputFav.checked = film.isFavourite;
            inputFav.classList.add('custom-control-input');
            inputFav.setAttribute('id', `film-${film.isFavourite}`)
            const labelFav = document.createElement('label');
            labelFav.classList.add('custom-control-label');
            labelFav.htmlFor = `film-${film.isFavourite}`;
            labelFav.innerText = 'Favorite';
            spanFav.appendChild(inputFav);
            spanFav.appendChild(labelFav);
            divFav.appendChild(spanFav);
            divRow.appendChild(divFav);

    const divDate = document.createElement('div');
    divDate.classList.add('col-4', 'col-xl-3', 'text-xl-center');
    divDate.innerText = (film.watchedDate === undefined) ? film.watchedDate.format("MMMM DD, YYYY") : "";
    divRow.appendChild(divDate);

    const divRate = document.createElement('div');
    divRate.classList.add('actions-container', 'col-8', 'col-xl-3', 'text-end');
        const divStars = document.createElement('div');
        divStars.classList.add('actions-container', 'col-8', 'col-xl-3', 'text-end');
        
        for(let i = 0; i < film.rating; i++){
            divStars.innerHTML = divStars.innerHTML + '<i class="bi bi-star-fill"></i> ';
        }
        for(let i = 0; i < 5-film.rating; i++){
            divStars.innerHTML = divStars.innerHTML + '<i class="bi bi-star"></i> ';
        }

    const divActions = document.createElement('div');
        divActions.classList.add('d-none', 'd-xl-flex', 'actions');
        const editButton = document.createElement('i');
        editButton.classList.add('bi', 'bi-pencil');
        //Add listener
        divActions.appendChild(editButton);

        const deleteButton = document.createElement('i');
        deleteButton.classList.add('bi', 'bi-trash');
        deleteButton.addEventListener('click', event => {
            //delete
        });

        divActions.appendChild(deleteButton);

        divRate.appendChild(divStars);
        divRate.appendChild(divActions);
        divRow.appendChild(divRate);

    return li;
}

function createFilmList(films){
    const filmList = document.getElementById('films-list');

    filmList.innerHTML = '';

    for (const film of films){
        const liFilm = createFilmLiElement(film);
        filmList.append(liFilm);
    }
}

function addFavoriteListener(films) {
    const filterFavorite = document.getElementById('filter-favorite');
    filterFavorite.addEventListener('click', event => {
        let filtered = [...films.filter((film, index, arr) => {
            return film.isFavourite === true;
        })];

        filterFavorite.setAttribute('aria-current', 'page');
        createFilmList(filtered);
    });
}

function addBestRateListener(films) {
    const filterRating = document.getElementById('filter-best-rate');
    filterRating.addEventListener('click', event => {
        let filtered = [...films.filter((film, index, arr) => {
            return film.rating === 5;
        })];

        filterRating.setAttribute('aria-current', 'page');
        createFilmList(filtered);
    });
}

function addLastMonthListener(films) {
    const filterLastMonth = document.getElementById('filter-last-month');
    filterLastMonth.addEventListener('click', event => {
        let filtered = [...films.filter((film, index, arr) => {
            return film.watchedDate >= dayjs().startOf('month');
        })];

        filterLastMonth.setAttribute('aria-current', 'page');
        createFilmList(filtered);
    });
}

function addUnseenListener(films) {
    const filterUnseen = document.getElementById('filter-unseen');
    filterUnseen.addEventListener('click', event => {
        let filtered = [...films.filter((film, index, arr) => {
            return film.watchedDate === undefined || film.watchedDate === null;
        })];

        filterUnseen.setAttribute('aria-current', 'page');
        createFilmList(filtered);
    });
}

function addAllListener(films) {
    const filterFavorite = document.getElementById('filter-all');
    filterFavorite.addEventListener('click', event => {
        let filtered = [...films];

        filterFavorite.setAttribute('aria-current', 'page');
        createFilmList(filtered);
    })
}

function deleteFilmListener(films) {
    const filterFavorite = document.getElementById('delete-');
    filterFavorite.addEventListener('click', event => {
        let filtered = [...films];

        filterFavorite.setAttribute('aria-current', 'page');
        createFilmList(filtered);
    })
}

function main() {
    const filmLib = new FilmLibrary();
    filmLib.init();
    
    console.log(filmLib.filmList);
    createFilmList(filmLib.filmList);
    addFavoriteListener(filmLib.filmList);
    addAllListener(filmLib.filmList);
    addBestRateListener(filmLib.filmList);
    addLastMonthListener(filmLib.filmList);
    addUnseenListener(filmLib.filmList);
}

main();