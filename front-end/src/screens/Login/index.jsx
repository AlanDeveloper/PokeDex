import { useState } from "react";

export default function Login() {

    const [usernameOremail, setUsernameOrEmail] = useState();
    const [password, setPassword] = useState();

    return (
        <form>
            <div>
                <label htmlFor="usernameOremail">Username or Email</label>
                <input type="text" id="usernameOremail" onChange={e => setUsernameOrEmail(e.target.value)} placeholder="Type your username or email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="text" id="password" onChange={e => setPassword(e.target.value)} placeholder="Type your password" />
            </div>
            <input type="submit" value="Submit" />
        </form>
    );
}