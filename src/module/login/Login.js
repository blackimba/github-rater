import React from "react";

const Login = () => {
    const CLIENT_ID = 'Ov23li0hNgDNMpJfY0No';
    const REDIRECT_URI = 'http://localhost:3000/callback';

    const handleLogin = () => {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    };

    return (
        <div>
            <h1>GitHub OAuth Example</h1>
            <button onClick={handleLogin}>Login with GitHub</button>
        </div>
    );
}

export default Login