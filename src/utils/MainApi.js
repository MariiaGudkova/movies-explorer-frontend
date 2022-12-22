import {USER_API_URL} from '../utils/constants.js';

export const register = (email, password, name) => {
  return fetch(`${USER_API_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => res.json());
};