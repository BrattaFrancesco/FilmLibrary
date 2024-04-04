'use strict'
import dayjs from "dayjs";

export function Film(id, title, isFavorite = false, watchedDate = null, rating = 0, userId = 1){
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