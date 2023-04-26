import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function Login() {

    const [showLoginError, setShowLoginError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const authContext = useAuth();    

    async function handleLogin() {
        if(await authContext.login(userName, password)){           
            setShowLoginError(false);
            navigate(`/welcome/${userName}`);  
        } else {
            setShowLoginError(true);
        }
    }

    return(
        <div className="container">       
            { showLoginError && <div className="loginError">Authenticated Failed</div>}
            <div className="loginForm">
                <fieldset>
                    <label>Usuario</label>
                    <input type="text" value={userName} onChange={ (e) => setUserName(e.target.value) } name="username" />
                </fieldset>
                <fieldset>               
                    <label>Contraseña</label>
                    <input type="password" value={password} onChange={ (e) => setPassword(e.target.value) } name="password" />          
                </fieldset>
                <div>
                    <button type="button" className="btn btn-success m-5" name="login" onClick={ handleLogin } >Login</button>
                </div>
            </div>
        </div>
    )
}