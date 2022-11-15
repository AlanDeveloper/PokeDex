import { signup } from "../../providers/authProvider";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useYupValidationResolver from "../../utils/useYupValidationResolver";
import textValidation from "../../utils/textValidation";

export default function SignUp() {

    const validationSchema = yup.object({
        name: yup.string().max(125, textValidation("name", { max: 125 })).required(textValidation("name", { required: true })),
        username: yup.string().max(125, textValidation("username", { max: 125 })).required(textValidation("username", { required: true })),
        email: yup.string().max(125, textValidation("email", { max: 125 })).required(textValidation("email", { required: true })),
        password: yup.string().max(125, textValidation("password", { max: 125 })).required(textValidation("password", { required: true })),
    });
    const resolver = useYupValidationResolver(validationSchema);
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver });
    const onSubmit = data => {
        signup(data).then(res => {
            console.log(res);
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Sign Up</h1>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" {...register("name")} id="name" placeholder="Type your name" />
                <p>{errors.name?.message}</p>
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" {...register("username")} id="username" placeholder="Type your username" />
                <p>{errors.username?.message}</p>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" {...register("email")} id="email" placeholder="Type your email" />
                <p>{errors.email?.message}</p>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" {...register("password")} id="password" placeholder="Type your password" />
                <p>{errors.password?.message}</p>
            </div>
            <input type="submit" value="Submit" />
        </form>
    );
}