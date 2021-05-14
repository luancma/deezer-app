import Axios from "axios";

export const api = Axios.create({
    baseURL: "https://cors-anywhere.herokuapp.com/https://api.deezer.com"
})