import api from "./api";

const signup = (formData) => {
    return api.post("/signup", formData).then(res => res.data);
}

export {
    signup
}