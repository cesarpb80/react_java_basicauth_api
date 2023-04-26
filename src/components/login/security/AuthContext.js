import { createContext, useContext, useState } from "react";
import todoApiService from "../../../api/todoApi.Service";
import { clientApiService } from "../../../api/clientApi.Service";

//1: Creacion del context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

//2: compartir context creado con otros componentes
export default function AuthProvider({children}) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [tokenAuth, setTokenAuth] = useState(null);

    // function login(userName, password) {
    //     if(userName === "in28minutes" && password === "12345") {
    //         setIsAuthenticated(true);
    //         setUsername(userName);
    //         return true;
    //     } else {
    //         setIsAuthenticated(false);
    //         setUsername(null);
    //         return false;
    //     }
    // }

    async function login(userName, password) {

        //El método btoa() crea una cadena ASCII codificada en Base64 a partir de una cadena binaria 
        //(es decir, una cadena en la que cada carácter de la cadena se trata como un byte de datos binarios).
        //NOTA EL TOKEN DEBE GENERARSE TAL CUAL RESPETANDO EL ESPACIO Y (:)
        //SI COLOCAMOS UN PASSWORD O USARIO DIFERENTE AL CONFIGURADO EN EL BACKEND 
        //has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
        
        try {
            // const tokenAuth = 'Basic ' + window.btoa(userName + ":" + password);        
            // const response = await todoApiService.executeBasicAuthentication(tokenAuth);

            const response = await todoApiService.executeJWTAuthentication(userName, password);

            if(response.status === 200) {
                const tokenAuth = 'Bearer ' + response.data.token;
                setIsAuthenticated(true);
                setUsername(userName);
                setTokenAuth(tokenAuth);
                
                clientApiService.interceptors.request.use(
                    (config) => {
                        console.log('Intercepting and adding a Token')
                        config.headers.Authorization = tokenAuth;
                        return config;
                    }
                )

                return true;
            } else {
                logout();
                return false;
            }
        } catch(error) {
            logout();
            return false;
        }
    }

    function logout() {
        setIsAuthenticated(false);
        setUsername(null);
        setTokenAuth(null);
    }

    return(
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username, tokenAuth }}>
            {children}
        </AuthContext.Provider>
    )
}