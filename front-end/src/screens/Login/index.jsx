import { useForm } from "react-hook-form";

export default function Login() {

    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="username">Username or Email</label>
                <input type="text" id="username" {...register("username")} placeholder="Type your username or email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" {...register("password")} placeholder="Type your password" />
            </div>
            <input type="submit" value="Submit" />
        </form>
    );
}