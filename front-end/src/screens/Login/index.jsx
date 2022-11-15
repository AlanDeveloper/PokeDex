import { useForm } from "react-hook-form";
import { login } from "../../providers/authProvider";
import textValidation from "../../Utils/textValidation";
import useYupValidationResolver from "../../Utils/useYupValidationResolver";
import * as yup from "yup";

export default function Login() {

    const validationSchema = yup.object({
        username: yup.string().max(125, textValidation("username", { max: 125 })).required(textValidation("username", { required: true })),
        password: yup.string().max(125, textValidation("password", { max: 125 })).required(textValidation("password", { required: true })),
    });
    const resolver = useYupValidationResolver(validationSchema);
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver });
    const onSubmit = data => {
        login(data).then(res => {
            console.log(res);
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