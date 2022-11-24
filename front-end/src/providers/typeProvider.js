import api from "./api";
import getCookie from "../utils/getCookie";

const token = getCookie("_token");

const listAll = (offset, limit) => {
    return api.get(`/type_pokemon?offset=${offset}&limit=${limit}`, { headers: {'x-access-token': token}}).then(res => res.data);
}

const addType = (formData) => {
    return api.post("/type_pokemon", formData, { headers: { 'x-access-token': token } }).then(res => res.data);
}

const updateType = (formData, id) => {
    return api.put("/type_pokemon/" + id, formData, { headers: { 'x-access-token': token } }).then(res => res.data);
}

const deleteType = (id) => {
    return api.delete("/type_pokemon/" + id, { headers: { 'x-access-token': token } }).then(res => res.data);
}

export {
    listAll,
    addType,
    updateType,
    deleteType
}