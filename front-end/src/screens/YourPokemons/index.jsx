import { useEffect } from "react";
import { useState } from "react";
import useStorage from "../../contexts/useStorage";
import { listAll } from "../../providers/pokemonProvider";
import { associatePokemon, deleteAssociatePokemon, listPokemons } from "../../providers/userProvider";
import useModal from "../../utils/useModal";
import ModalCreate from "./components/ModalCreate";
import textValidation from "../../utils/textValidation";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../utils/useYupValidationResolver";
import * as yup from "yup";
import Pagination from "../../components/Pagination";

export default function YourPokemons() {

    const validationSchema = yup.object({
        createPokemonId: yup.string().required(textValidation("pokemonId", { required: true }))
    });
    const resolver = useYupValidationResolver(validationSchema);
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver });
    const { isShowing, toggle } = useModal();
    const [user] = useStorage("user");
    const [pokemons, setPokemons] = useState([]);
    const [yourPokemons, setYourPokemons] = useState([]);
    const [total, setTotal] = useState(0);
    const [offset, setOffset] = useState(0);
    const limit = 25;

    useEffect(() => {
        listAll(offset, limit).then(res => {
            setPokemons(res.pokemons);
        });
        listPokemons(user.id).then(res => {
            setYourPokemons(res);
            setTotal(res.total);
        });
    }, [user.id, offset]);

    const onCreate = (data) => {
        associatePokemon({ pokemonId: data.createPokemonId }, user.id).then(res => {
            listPokemons(user.id).then(res => setYourPokemons(res));
        });
    }

    const onDelete = (id) => {
        deleteAssociatePokemon(id).then(res => {
            listPokemons(user.id).then(res => setYourPokemons(res));
        });
    }
    
    return (
        <>
            <button className="button-default" onClick={toggle}>Show ModalCreate</button>
            <ModalCreate
                register={register}
                errors={errors}
                pokemons={pokemons}
                onSubmit={handleSubmit(onCreate)}
                isShowing={isShowing}
                hide={toggle}
            />
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Type</td>
                        {user.admin && (
                            <td>Action</td>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {yourPokemons.length > 0 ? (
                        yourPokemons.map((associatePokemon, index) => {
                            return (
                                <tr key={index}>
                                    <td>{associatePokemon.pokemon.name}</td>
                                    <td>{associatePokemon.pokemon.type_pokemon.name}</td>
                                    {user.admin && (
                                        <td>
                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                onDelete(associatePokemon.id);
                                            }}>
                                                <input type="submit" value="Delete" />
                                            </form>
                                        </td>
                                    )}
                                </tr>
                            )
                        }))
                        : (
                            <tr>
                                <td colSpan={4}>Nenhum resultado encontrado</td>
                            </tr>
                        )
                    }
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <Pagination total={total} offset={offset} setOffset={newOffset => setOffset(newOffset)} limit={limit} />
        </>
    );
}