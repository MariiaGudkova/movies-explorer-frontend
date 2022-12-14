import {BEATFILM_MOVIES_URL} from './constants.js';

export function getMovies() {
  return fetch(BEATFILM_MOVIES_URL, {
    method: "GET", 
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }}).then((res) => res.json());
};
