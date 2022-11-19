import { useEffect, useState } from "react";
import { listAll } from "../../providers/userProvider";

export default function Pokemon() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        listAll().then(res => setUsers(res));
    }, []);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Username</td>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((type, index) => {
                            return (
                                <tr key={index}>
                                    <td>{type.name}</td>
                                    <td>{type.email}</td>
                                    <td>{type.username}</td>
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