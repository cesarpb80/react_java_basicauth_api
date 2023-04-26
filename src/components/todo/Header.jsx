import { Link } from "react-router-dom";
import { useAuth } from "../login/security/AuthContext";


export default function Header() {

    const authContext = useAuth();

    function logout() {
        authContext.logout();
    }
 
    return(
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://www.in28minutes.com">in28minutes</a>                      
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav">                   
                                    { authContext.isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/welcome/cesar">Home</Link></li> }
                                    { authContext.isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/todos">Todos</Link></li> }
                                </ul>
                           </div>                      
                        <ul className="navbar-nav">                   
                            { !authContext.isAuthenticated &&<li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li> }
                            { authContext.isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/login" onClick={ logout }>Logout</Link></li> }
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}