import { useEffect, useState } from "react";
import { listAll } from "../../providers/pokemonProvider";

export default function Pokemon() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        listAll().then(res => setPokemons(res));
    }, []);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Type</td>
                    </tr>
                </thead>
                <tbody>
                    {pokemons.length > 0 ? (
                        pokemons.map((type, index) => {
                            return (
                                <tr key={index}>
                                    <td>{type.name}</td>
                                    <td>{type.typeId}</td>
                                </tr>
                            )
                        }))
                        : (
                            <tr>
                                <td colSpan={2}>Nenhum resultado encontrado</td>
                            </tr>
                        )
                    }
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}