import api from "./api";

const signup = (formData) => {
    return api.post("/signup", formData).then(res => res.data);
}

const login = (formData) => {
    return api.post("/login", formData).then(res => res.data);
}

export {
    signup,
    login
}