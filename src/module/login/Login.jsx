import React from "react";
import { useAuth } from "../../util/context/authentication";

const Login = () => {
    const { login } = useAuth();

    return (
        <div>
            <h1>GitHub OAuth Example</h1>
            <button onClick={login}>Login with GitHub</button>
        </div>
    );
}

export default Login