import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import SignUp from "./screens/SignUp";

export default function App() {
    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={{user, setUser}}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </UserContext.Provider>
    );
}