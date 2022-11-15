import { signup } from "../../providers/authProvider";
import { useForm } from "react-hook-form";

export default function SignUp() {

    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();
        
    //     let formData = new FormData();
    //     formData.append('name', name);
    //     formData.append('username', username);
    //     formData.append('email', email);
    //     formData.append('password', password);

    //     signup(formData).then(res => {
    //         console.log(res);
    //     });
    // };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Sign Up</h1>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" {...register("name")} id="name" placeholder="Type your name" />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" {...register("username")} id="username" placeholder="Type your username" />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" {...register("email")} id="email" placeholder="Type your email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" {...register("password")} id="password" placeholder="Type your password" />
            </div>
            <input type="submit" value="Submit" />
        </form>
    );
}