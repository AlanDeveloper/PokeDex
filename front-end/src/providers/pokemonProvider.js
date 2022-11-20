import api from "./api";
import getCookie from "../utils/getCookie";

const token = getCookie("_token");

const listAll = () => {
    return api.get("/pokemon", { headers: { 'x-access-token': token } }).then(res => res.data);
}

const addPokemon = (formData) => {
    return api.post("/pokemon", formData, { headers: { 'x-access-token': token } }).then(res => res.data);
}

const updatePokemon = (formData, id) => {
    return api.put("/pokemon/" + id, formData, { headers: { 'x-access-token': token } }).then(res => res.data);
}

const deletePokemon = (id) => {
    return api.delete("/pokemon/" + id, { headers: { 'x-access-token': token } }).then(res => res.data);
}

export {
    listAll,
    addPokemon,
    updatePokemon,
    deletePokemon
}