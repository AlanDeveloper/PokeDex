import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import Pokemon from "./screens/Pokemon";
import SignUp from "./screens/SignUp";
import Type from "./screens/Type";
import User from "./screens/User";
import getCookie from "./utils/getCookie";

export default function App() {
    const [user, setUser] = useState({});
    const auth = getCookie("_token");

    return (
        <UserContext.Provider value={{user, setUser}}>
            <Routes>
                <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />
                <Route path="/login" element={!auth ? <Login /> : <Navigate to="/" />} />
                <Route path="/signup" element={!auth ? <SignUp /> : <Navigate to="/" />} />
                <Route path="/type_pokemon" element={auth ? <Type /> : <Navigate to="/" />} />
                <Route path="/pokemon" element={auth ? <Pokemon /> : <Navigate to="/" />} />
                <Route path="/user" element={auth ? <User /> : <Navigate to="/" />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </UserContext.Provider>
    );
}