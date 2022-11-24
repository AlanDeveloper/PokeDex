import { useEffect, useState } from "react";
import { addPokemon, deletePokemon, listAll, updatePokemon } from "../../providers/pokemonProvider";
import { listAll as listAllTypes } from "../../providers/typeProvider";
import { useForm } from "react-hook-form";
import useModal from "../../utils/useModal";
import useYupValidationResolver from "../../utils/useYupValidationResolver";
import textValidation from "../../utils/textValidation";
import ModalCreate from "./components/ModalCreate";
import ModalUpdate from "./components/ModalUpdate";
import * as yup from "yup";
import useStorage from "../../contexts/useStorage";
import Pagination from "../../components/Pagination";

export default function Pokemon() {

    const validationSchemaCreate = yup.object({
        createName: yup.string().max(125, textValidation("name", { max: 125 })).required(textValidation("name", { required: true })),
        createTypeId: yup.string().required(textValidation("typeId", { required: true }))
    });
    const validationSchemaUpdate = yup.object({
        updateName: yup.string().max(125, textValidation("name", { max: 125 })).required(textValidation("name", { required: true })),
        updateTypeId: yup.string().required(textValidation("typeId", { required: true })),
    });
    const resolverCreate = useYupValidationResolver(validationSchemaCreate);
    const resolverUpdate = useYupValidationResolver(validationSchemaUpdate);
    const { register: registerCreate, handleSubmit: handleSubmitCreate, formState: { errors: errorsCreate } } = useForm({ resolver: resolverCreate });
    const { register: registerUpdate, handleSubmit: handleSubmitUpdate, formState: { errors: errorsUpdate }, reset } = useForm({ resolver: resolverUpdate });
    const [pokemons, setPokemons] = useState([]);
    const [types, setTypes] = useState([]);
    const { isShowing: isShowingCreate, toggle: toggleCreate } = useModal();
    const { isShowing: isShowingUpdate, toggle: toggleUpdate } = useModal();
    const [data, setData] = useState({});
    const [user] = useStorage("user");
    const [total, setTotal] = useState(0);
    const [offset, setOffset] = useState(0);
    const limit = 25;

    useEffect(() => {
        listAll(offset, limit).then(res => {
            setPokemons(res.pokemons);
            setTotal(res.total);
        });
        listAllTypes().then(res => setTypes(res));
    }, [offset]);

    const onCreate = (formData) => {
        addPokemon({ name: formData.createName, typeId: formData.createTypeId }).then(res => {
            listAll().then(res => setPokemons(res));
        });
    }

    const onUpdate = (formData) => {
        updatePokemon({ name: formData.updateName, typeId: formData.updateTypeId }, data.id).then(res => {
            listAll().then(res => setPokemons(res));
        });
    }

    const onDelete = (id) => {
        deletePokemon(id).then(res => {
            listAll().then(res => setPokemons(res));
        });
    }

    const toggleCustomCreate = () => {
        setData({});
        if (isShowingUpdate) toggleUpdate();
        toggleCreate();
    }

    const toggleCustomUpdate = (data) => {
        if (data) setData(data);
        if (isShowingCreate) toggleCreate();
        reset();
        toggleUpdate();
    }

    return (
        <>
            <button className="button-default" onClick={toggleCustomCreate}>Show ModalCreate</button>
            <ModalCreate
                register={registerCreate}
                errors={errorsCreate}
                onSubmit={handleSubmitCreate(onCreate)}
                types={types}
                isShowing={isShowingCreate}
                hide={toggleCustomCreate}
            />
            <ModalUpdate
                register={registerUpdate}
                errors={errorsUpdate}
                onSubmit={handleSubmitUpdate(onUpdate)}
                types={types}
                isShowing={isShowingUpdate}
                hide={toggleCustomUpdate}
                data={data}
            />
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Type</td>
                        {user.admin && (
                            <>
                                <td>Action</td>
                                <td>Action</td>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {pokemons.length > 0 ? (
                        pokemons.map((pokemon, index) => {
                            return (
                                <tr key={index}>
                                    <td>{pokemon.name}</td>
                                    <td>{pokemon.type_pokemon.name}</td>
                                    {user.admin && (
                                        <>
                                            <td><button className="button-default" onClick={() => toggleCustomUpdate({ id: pokemon.id, name: pokemon.name, typeId: pokemon.typeId })}>Show ModalUpdate</button></td>
                                            <td>
                                                <form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    onDelete(pokemon.id);
                                                }}>
                                                    <input type="submit" value="Delete" />
                                                </form>
                                            </td>
                                        </>
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