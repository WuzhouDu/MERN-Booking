import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';

const SignOutButton = () => {
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: () => {
            queryClient.invalidateQueries("validateToken");
            showToast({ type: "SUCCESS", message: "log out success!" });
        },
        onError: () => {
            showToast({ type: "ERROR", message: "log out error" });
        }
    });

    const handleClick = () => {
        mutation.mutate();
    }

    return (
        <button className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100" onClick={handleClick}>Sign Out</button>
    );
}

export default SignOutButton;