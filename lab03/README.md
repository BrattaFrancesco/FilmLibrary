# `film-library-server`

The `film-library-server` is a server-side app with APIs managing a library of films.

## APIs
Here you can find the designed HTTP APIs implemented in the project.

### __List all films__

URL: `/api/films`

HTTP Method: GET.

Description: Retrieve all films.

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).
f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId
Response body:
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "isFavorite": 1,
    "watchedDate": "2024-02-07",
    "rating": 5,
    "userId": 1
  },
  ...
]
```

### __List all favorite films__

URL: `/api/films/favorite`

HTTP Method: GET.

Description: Retrieve all favorite films.

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).
f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId
Response body:
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "isFavorite": 1,
    "watchedDate": "2024-02-07",
    "rating": 5,
    "userId": 1
  },
  ...
]
```

### __List best films__

URL: `/api/films/best`

HTTP Method: GET.

Description: Retrieve all best films (rated 5 out of 5)).

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).
f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId
Response body:
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "isFavorite": 1,
    "watchedDate": "2024-02-07",
    "rating": 5,
    "userId": 1
  },
  ...
]
```

### __List all films seen in the last month__

URL: `/api/films/last-month`

HTTP Method: GET.

Description: Retrieve all films seen in the last month.

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body:
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "isFavorite": 1,
    "watchedDate": "2024-02-07",
    "rating": 5,
    "userId": 1
  },
  ...
]
```

### __List all unseen films__

URL: `/api/films/unseen`

HTTP Method: GET.

Description: Retrieve all unseen films.

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body:
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "isFavorite": 1,
    "watchedDate": "2024-02-07",
    "rating": 5,
    "userId": 1
  },
  ...
]
```

### __Get a single film__

URL: `/api/films/<id>`

HTTP Method: GET.

Description: Get a film by id.

Response: `200 OK` (success) or `404 Not Found` (wrong id) or `500 Internal Server Error` (generic error).
f.id, f.title, f.isFavorite, f.watchDate, f.rating, f.userId
Response body:
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "isFavorite": 1,
    "watchedDate": "2024-02-07",
    "rating": 5,
    "userId": 1
  },
  ...
]
```

### __Create a new film__

URL: `/api/films`

HTTP Method: POST.

Description: Create a new film with the given information.

Request body:
```
{
  "title": "Titanic",
  "isFavourte": 0,
  "watchedDate": null,
  "rating": 3,
  "userId": 1
}
```

Response: `201 Created` (succes, with the created id) or`503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: __None__

### __Update an exstisting film by id__

URL: `/api/films/<id>`

HTTP Method: PUT.

Description: Update a film with the given information.

Request body:
```
{
  "title": "Titanic",
  "isFavourte": 0,
  "watchedDate": "",
  "rating": 3,
  "userId": 1
}
```

Response: `200 OK` (succes) or `404 Not Found` (wrong id) or`503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: __None__

### __Update rating of an exstisting film by id__

URL: `/api/films/<id>/rating`

HTTP Method: PUT.

Description: Update the rating of a film.

Request body:
```
{
  "rating": 1,
}
```

Response: `200 OK` (succes) or `404 Not Found` (wrong id) or`503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: __None__

### __Mark film as favorite/unfavorite by id__

URL: `/api/films/<id>/favorite`

HTTP Method: PUT.

Description: Mark film as favorite/unfavorite.

Request body:
```
{
  "isFavorite": 1,
}
```

Response: `200 OK` (succes) or `404 Not Found` (wrong id) or`503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: __None__

### __Delete a film__

URL: `/api/films/<id>`

HTTP Method: DELETE.

Description: Delete a film.

Response: `200 OK` (succes) or `404 Not Found` (wrong id) or`503 Service Unavailable` (generic error).

Response body: __None__