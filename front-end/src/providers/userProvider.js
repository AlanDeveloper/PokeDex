import api from "./api";
import getCookie from "../utils/getCookie";

const token = getCookie("_token");

const listAll = (offset, limit) => {
    return api.get(`/user?offset=${offset}&limit=${limit}`, { headers: { 'x-access-token': token } }).then(res => res.data);
}

const updateUser = (formData, id) => {
    return api.put("/user/" + id, formData, { headers: { 'x-access-token': token } }).then(res => res.data);
}

const deleteUser = (id) => {
    return api.delete("/user/" + id, { headers: { 'x-access-token': token } }).then(res => res.data);
}

const listPokemons = (id, offset, limit) => {
    return api.get("/user/" + id + "/pokemon", { headers: { 'x-access-token': token } }).then(res => res.data);
}

const associatePokemon = (formData, id) => {
    return api.post("/user/" + id + "/pokemon", formData, { headers: { 'x-access-token': token } }).then(res => res.data);
}

const deleteAssociatePokemon = (id) => {
    return api.delete("/user/disassociatePokemon/" + id, { headers: { 'x-access-token': token } }).then(res => res.data);
}

export {
    listAll,
    updateUser,
    deleteUser,
    listPokemons,
    associatePokemon,
    deleteAssociatePokemon
}