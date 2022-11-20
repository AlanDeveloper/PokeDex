import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

export default function Home() {
    
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const logout = () => {
        document.cookie = "_token=; Max-Age=0";
        setUser();

        navigate("/login");
    }
    
    return (
        <div>
            <h1>Bem vindo!</h1>
            <Link to="/type_pokemon">Type</Link>
            <Link to="/pokemon">Pokemon</Link>
            <Link to="/your_pokemons">Your pokemons</Link>
            <Link to="/user">User</Link>
            <Link to="#" onClick={logout}>Logout</Link>
        </div>
    );
}