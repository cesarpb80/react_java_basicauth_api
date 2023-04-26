import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../login/LoginComponent";
import Welcome from "../login/WelcomeComponent";
import ErrorPath from "../login/ErrorPatchComponent";
import Todos from "../todos/TodosComponent";
import Footer from "./Footer";
import Header from "./Header";
import Todo from "../todos/TodoComponent";
import AuthProvider, { useAuth } from "../login/security/AuthContext";

function AuthenticatedRoute({ children }) {
    
    const authContext = useAuth();

    if(authContext.isAuthenticated)
        return children;

    return <Navigate to={"/"} />
}


export default function TodoApp() {
   return(
        <div className="TodoApp">     
            <AuthProvider>
                <BrowserRouter>
                    <Header />            
                    <Routes>                    
                        <Route path="/" element={ <Login /> } />
                        <Route path="/login" element={ <Login /> } />
                        <Route path="/welcome/:username" element={ 
                            <AuthenticatedRoute>
                                <Welcome /> 
                            </AuthenticatedRoute>                     
                            } />
                        <Route path="/todo/:id" element={ 
                            <AuthenticatedRoute>
                                <Todo /> 
                            </AuthenticatedRoute>                     
                            } />
                        <Route path="/todos" element={ 
                            <AuthenticatedRoute>
                                <Todos />
                            </AuthenticatedRoute> } />
                        <Route path="*" element={ <ErrorPath /> } />
                    </Routes>            
                    <Footer/>
            </BrowserRouter>
            </AuthProvider>
        </div>
    )
}