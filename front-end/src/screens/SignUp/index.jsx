import { useState } from "react";
import { signup } from "../../providers/authProvider";

export default function SignUp() {

    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        let formData = new FormData();
        formData.append('name', name);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);

        signup(formData).then(res => {
            console.log(res);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" onChange={e => setName(e.target.value)} placeholder="Type your name" />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" onChange={e => setUsername(e.target.value)} placeholder="Type your username" />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" onChange={e => setEmail(e.target.value)} placeholder="Type your email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="text" id="password" onChange={e => setPassword(e.target.value)} placeholder="Type your password" />
            </div>
            <input type="submit" value="Submit" />
        </form>
    );
}