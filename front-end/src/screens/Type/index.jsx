import { useEffect } from "react";
import { useState } from "react";
import { listAll } from "../../providers/typeProvider";

export default function Type() {

    const [types, setTypes] = useState([]);

    useEffect(() => {
        listAll().then(res => setTypes(res));
    }, []);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {types.length > 0 ? (
                        types.map(type => {
                            return (
                            <tr>
                                <td>{type.name}</td>
                                <td>{type.status ? "Active" : "Inactive"}</td>
                            </tr>
                        )}))
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