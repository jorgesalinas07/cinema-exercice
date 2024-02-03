import { OPTIONS, API_MOVIE_ID_URL } from "./constants.js";

export const get_movie = async(movieId) => {
  try {
    const apiUrl = API_MOVIE_ID_URL.replace('{id}', movieId);
    const response = await fetch(apiUrl, OPTIONS);
    const result = await response.text();
    return JSON.parse(result).results;
  } catch (error) {
    console.error(error);
  }
}
