import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
    const navigate = useNavigate();

    const fetchAccessToken = async () => {
        const code = new URLSearchParams(window.location.search).get('code');
        const CLIENT_ID = 'Ov23li0hNgDNMpJfY0No';
        const CLIENT_SECRET = 'e316a254b7e2f9ae9ef8073d4e8f16d4c591c6cd';

        try {
            const response = await axios.post('/login/oauth/access_token', {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code: code,
            }, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            localStorage.setItem('accessToken', response.data.access_token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error during authentication process', error);
        }
    }

    useEffect(() => {
        fetchAccessToken();
    }, [fetchAccessToken])
};

export default Callback;