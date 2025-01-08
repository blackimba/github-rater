import { useEffect } from 'react';
import { useAuth } from '../../util/context/authentication';

const Callback = () => {
    const { fetchAccessToken, isAuthenticated } = useAuth();

    useEffect(() => {
        console.log('isAuthenticated: ', isAuthenticated)
        if(!isAuthenticated) {
            fetchAccessToken();
        }
    }, [fetchAccessToken, isAuthenticated])

    return <div>Loading...</div>
};

export default Callback;