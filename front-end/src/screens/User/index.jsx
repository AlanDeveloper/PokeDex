import { useEffect, useState } from "react";
import { deleteUser, listAll, updateUser } from "../../providers/userProvider";
import { useForm } from "react-hook-form";
import useModal from "../../utils/useModal";
import useYupValidationResolver from "../../utils/useYupValidationResolver";
import textValidation from "../../utils/textValidation";
import ModalUpdate from "./components/ModalUpdate";
import * as yup from "yup";
import useStorage from "../../contexts/useStorage";

export default function User() {

    const validationSchemaUpdate = yup.object({
        updateName: yup.string().max(125, textValidation("name", { max: 125 })).required(textValidation("name", { required: true })),
        updateEmail: yup.string().required(textValidation("email", { required: true })),
        updateUsername: yup.string().required(textValidation("username", { required: true })),
    });
    const resolverUpdate = useYupValidationResolver(validationSchemaUpdate);
    const { register: registerUpdate, handleSubmit: handleSubmitUpdate, formState: { errors: errorsUpdate }, reset } = useForm({ resolver: resolverUpdate });
    const [users, setUsers] = useState([]);
    const { isShowing: isShowingCreate, toggle: toggleCreate } = useModal();
    const { isShowing: isShowingUpdate, toggle: toggleUpdate } = useModal();
    const [data, setData] = useState({});
    const [user, setUser] = useStorage("user");

    useEffect(() => {
        listAll().then(res => setUsers(res));
    }, []);

    const onUpdate = (formData) => {
        updateUser({ name: formData.updateName, email: formData.updateEmail, username: formData.updateUsername, admin: formData.updateAdmin }, data.id).then(res => {
            listAll().then(res => setUsers(res));
        });
    }

    const onDelete = (id) => {
        deleteUser(id).then(res => {
            listAll().then(res => setUsers(res));
        });
    }

    const toggleCustomUpdate = (data) => {
        if (data) setData(data);
        if (isShowingCreate) toggleCreate();
        reset();
        toggleUpdate();
    }

    return (
        <>
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
                        <td>Email</td>
                        <td>Username</td>
                        {user.admin && (
                            <>
                                <td>Action</td>
                                <td>Action</td>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user2, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user2.name}</td>
                                    <td>{user2.email}</td>
                                    <td>{user2.username}</td>
                                    {user.admin && (
                                        <>
                                            <td><button className="button-default" onClick={() => toggleCustomUpdate({ id: user2.id, name: user2.name, email: user2.email, username: user2.username, admin: user2.admin })}>Show ModalUpdate</button></td>
                                            <td>
                                                <form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    onDelete(user2.id);
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
                                <td colSpan={5}>Nenhum resultado encontrado</td>
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