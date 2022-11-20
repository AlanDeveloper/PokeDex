import { useEffect, useState } from "react";
import { addType, deleteType, listAll, updateType } from "../../providers/pokemonProvider";
import { listAll as listAllTypes } from "../../providers/typeProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useModal from "../../utils/useModal";
import useYupValidationResolver from "../../utils/useYupValidationResolver";
import textValidation from "../../utils/textValidation";
import ModalCreate from "./components/ModalCreate";
import ModalUpdate from "./components/ModalUpdate";
import * as yup from "yup";

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
    const navigate = useNavigate();
    const [pokemons, setPokemons] = useState([]);
    const [types, setTypes] = useState([]);
    const { isShowing: isShowingCreate, toggle: toggleCreate } = useModal();
    const { isShowing: isShowingUpdate, toggle: toggleUpdate } = useModal();
    const [data, setData] = useState({});

    useEffect(() => {
        listAll().then(res => setPokemons(res));
        listAllTypes().then(res => setTypes(res));
    }, [pokemons]);

    const onCreate = formData => {
        addType({ name: formData.createName, typeId: formData.createTypeId }).then(res => {
            navigate("/pokemon");
        });
    }

    const onUpdate = (formData) => {
        updateType({ name: formData.updateName, typeId: formData.updateTypeId }, data.id).then(res => {
            navigate("/pokemon");
        });
    }

    const onDelete = (id) => {
        deleteType(id).then(res => {
            console.log(res);
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
                        <td>Action</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {pokemons.length > 0 ? (
                        pokemons.map((pokemon, index) => {
                            return (
                                <tr key={index}>
                                    <td>{pokemon.name}</td>
                                    <td>{pokemon.typeId}</td>
                                    <td><button className="button-default" onClick={() => toggleCustomUpdate({ id: pokemon.id, name: pokemon.name, typeId: pokemon.typeId })}>Show ModalUpdate</button></td>
                                    <td>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            onDelete(pokemon.id);
                                        }}>
                                            <input type="submit" value="Delete" />
                                        </form>
                                    </td>
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