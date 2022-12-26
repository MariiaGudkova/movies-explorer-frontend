import {USERS_API_URL} from '../utils/constants.js';

export const register = (email, password, name) => {
  return fetch(`${USERS_API_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => res.json());
};

export const login = (email, password) => {
  return fetch(`${USERS_API_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
};

export const getUser = (jwt) => {
  return fetch(`${USERS_API_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => res.json());
};

export const updateUser = (jwt, email, name) => {
  return fetch(`${USERS_API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ email, name }),
  }).then((res) => res.json());
};

export const saveMovie = (jwt, {country, director, duration,
  year, description, imageUrl, trailerLink,
  thumbnail, id: movieId, nameRU, nameEN}) => {
  return fetch(`${USERS_API_URL}/movies`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ country, director, duration,
      year, description, imageUrl, trailerLink,
      thumbnail, movieId, nameRU, nameEN }),
  }).then((res) => res.json());
};

export const getSavedMovies = (jwt, user) => {
  return fetch(`${USERS_API_URL}/movies`, {
    method: "GET", 
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    }}).then((res) => res.json());
}

export const deleteMovie = (jwt, _id) => {
  return fetch(`${USERS_API_URL}/movies/${_id}`, {
    method: "DELETE", 
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    }}).then((res) => res.json());
}

