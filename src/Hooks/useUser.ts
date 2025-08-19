import { useContext } from "react";
import { UserContext } from "../Context/UserContext/UserContext";


export const useUser= () =>{

    const userContext = useContext(UserContext);

    if(!userContext){
        throw new Error('user not available!');
    } else {
        return userContext
    }
};