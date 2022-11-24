import { useEffect } from "react";
import { useState } from "react";
import { addType, deleteType, listAll, updateType } from "../../providers/typeProvider";
import { useForm } from "react-hook-form";
import useModal from "../../utils/useModal";
import useYupValidationResolver from "../../utils/useYupValidationResolver";
import textValidation from "../../utils/textValidation";
import ModalCreate from "./components/ModalCreate";
import ModalUpdate from "./components/ModalUpdate";
import * as yup from "yup";
import useStorage from "../../contexts/useStorage";
import Pagination from "../../components/Pagination";

export default function Type() {

    const validationSchemaCreate = yup.object({
        createName: yup.string().max(125, textValidation("name", { max: 125 })).required(textValidation("name", { required: true })),
        createStatus: yup.string().required(textValidation("status", { required: true }))
    });
    const validationSchemaUpdate = yup.object({
        updateName: yup.string().max(125, textValidation("name", { max: 125 })).required(textValidation("name", { required: true })),
        updateStatus: yup.string().required(textValidation("status", { required: true })),
    });
    const resolverCreate = useYupValidationResolver(validationSchemaCreate);
    const resolverUpdate = useYupValidationResolver(validationSchemaUpdate);
    const { register: registerCreate, handleSubmit: handleSubmitCreate, formState: { errors: errorsCreate } } = useForm({ resolver: resolverCreate });
    const { register: registerUpdate, handleSubmit: handleSubmitUpdate, formState: { errors: errorsUpdate }, reset } = useForm({ resolver: resolverUpdate });
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
            setTypes(res.types);
            setTotal(res.total);
        });
    }, []);

    const onCreate = (formData) => {
        addType({ name: formData.createName, status: formData.createStatus }).then(res => {
            listAll().then(res => setTypes(res));
        });
    }

    const onUpdate = (formData) => {
        updateType({ name: formData.updateName, status: formData.updateStatus }, data.id).then(res => {
            listAll().then(res => setTypes(res));
        });
    }

    const onDelete = (id) => {
        deleteType(id).then(res => {
            listAll().then(res => setTypes(res));
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
                isShowing={isShowingCreate}
                hide={toggleCustomCreate}
            />
            <ModalUpdate
                register={registerUpdate}
                errors={errorsUpdate}
                onSubmit={handleSubmitUpdate(onUpdate)}
                isShowing={isShowingUpdate}
                hide={toggleCustomUpdate}
                data={data}
            />
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Status</td>
                        {user.admin && (
                            <>
                                <td>Action</td>
                                <td>Action</td>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {types.length > 0 ? (
                        types.map((type, index) => {
                            return (
                            <tr key={index}>
                                <td>{type.name}</td>
                                <td>{type.status ? "Active" : "Inactive"}</td>
                                {user.admin && (
                                    <>
                                        <td><button className="button-default" onClick={() => toggleCustomUpdate({ id: type.id, name: type.name, status: type.status })}>Show ModalUpdate</button></td>
                                        <td>
                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                onDelete(type.id);
                                            }}>
                                                <input type="submit" value="Delete" />
                                            </form>
                                        </td>
                                    </>
                                )}
                            </tr>
                        )}))
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