import api from "./api";
import getCookie from "../utils/getCookie";

const token = getCookie("_token");

const listAll = () => {
    return api.get("/type_pokemon", { headers: {'x-access-token': token}}).then(res => res.data);
}

export {
    listAll
}