import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/Appcontext";
const SignOutbutton = () => {
    const queryClient = useQueryClient();
    const {showToast} = useAppContext();
    const mutation = useMutation(apiClient.signOut,{
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            showToast({message:"Logged out successfully", type:"SUCCESS"})
        },
        onError:(error:Error) => {
            showToast({message:error.message, type:"ERROR"})

        }
    })

    const handleClick = () => {
        mutation.mutate()
    }
    return (
        <button className="text-blue-600 bg-white font-bold px-3 hover:bg-gray-100" onClick={handleClick}>
            Signout
        </button>
    )
}

export default SignOutbutton;