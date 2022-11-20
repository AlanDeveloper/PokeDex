import api from "./api";
import getCookie from "../utils/getCookie";

const token = getCookie("_token");

const listAll = () => {
    return api.get("/user", { headers: { 'x-access-token': token } }).then(res => res.data);
}

const updateUser = (formData, id) => {
    return api.put("/user/" + id, formData, { headers: { 'x-access-token': token } }).then(res => res.data);
}

const deleteUser = (id) => {
    return api.delete("/user/" + id, { headers: { 'x-access-token': token } }).then(res => res.data);
}

export {
    listAll,
    updateUser,
    deleteUser
}