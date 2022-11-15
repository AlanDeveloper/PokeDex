import { useForm } from "react-hook-form";
import { login } from "../../providers/authProvider";
import textValidation from "../../utils/textValidation";
import useYupValidationResolver from "../../utils/useYupValidationResolver";
import * as yup from "yup";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

export default function Login() {

    const validationSchema = yup.object({
        username: yup.string().max(125, textValidation("username", { max: 125 })).required(textValidation("username", { required: true })),
        password: yup.string().max(125, textValidation("password", { max: 125 })).required(textValidation("password", { required: true })),
    });
    const resolver = useYupValidationResolver(validationSchema);
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver });
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const onSubmit = data => {
        login(data).then(res => {
            setUser(res);

            const d = new Date();
            d.setTime(d.getTime() + 6000000);
            let expires = "expires=" + d.toUTCString();
            document.cookie = "_token=" + res.token + ";" + expires + ";path=/";

            navigate("/");
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="username">Username or Email</label>
                <input type="text" id="username" {...register("username")} placeholder="Type your username" />
                <p>{errors.username?.message}</p>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" {...register("password")} placeholder="Type your password" />
                <p>{errors.password?.message}</p>
            </div>
            <input type="submit" value="Submit" />
        </form>
    );
}