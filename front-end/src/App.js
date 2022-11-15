import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import SignUp from "./screens/SignUp";

export default function App() {
    const [user, setUser] = useState({});
    const auth = getCookie("_token");

    return (
        <UserContext.Provider value={{user, setUser}}>
            <Routes>
                <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />
                <Route path="/login" element={!auth ? <Login /> : <Navigate to="/" />} />
                <Route path="/signup" element={!auth ? <SignUp /> : <Navigate to="/" />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </UserContext.Provider>
    );
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) return parts.pop().split(';').shift();
}