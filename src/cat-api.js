import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_H8kgXX6GjcV1ELDjiZOsup29YhUUOtHdPbYYJuoQvOz1p3MjNy89YBwQNTuvAcF8";

 const BASE_URL =  'https://api.thecatapi.com/v1';

 export function fetchBreeds() {
    return axios.get(`${BASE_URL}/breeds`).then(response => response.data);
 }
fetchBreeds().then(console.log)

 export function fetchCatByBreed(breedId) {
    return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`).then(response => {
        return response.data;
    });
 }
