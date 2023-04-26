import { useEffect, useState } from "react";
import todoApiService from "../../api/todoApi.Service";
import { useAuth } from "../login/security/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Todos() {

    const authContext = useAuth();

    const [data, setData] = useState([]);
    const [message, setMessage] = useState(null);
    const username = authContext.username;
    const navigate = useNavigate();

    function getTodosByUser() {
        todoApiService.getTodosForUser(username).then(response => {            
            setData(response.data);         
        }).catch(error => {
            console.error(error);
        });
    }

    function deleteTodo(id) {  
        todoApiService.deleteTodoById(username, id).then(() => {
            setMessage(`Se elimino el todo con Id:${id}`);
            getTodosByUser();
        }).catch(error => {
            console.error(error);
        })
    }

    function updateTodo(id) { 
        navigate(`/todo/${id}`)
    }

    function addNewTodo() {
        navigate(`/todo/-1`)
    }

    //NOTA: Elimiar error React Hook useEffect has a missing dependency: 'getTodosByUser'
    //https://codevoweb.com/react-hook-useeffect-has-a-missing-dependency-error/
    // const fetchUser = useCallback(async () => {
    //     const res = fetch(
    //       `https://jsonplaceholder.typicode.com/users/${query}`
    //     ).then((res) => res.json());
    //     const user = await res;
    //     setUser(user);
    //     // ? provide it with the query variable
    // }, [query]);

    useEffect(() => getTodosByUser(), [] );

    return(
        <div className="container">
            <h1>Todos</h1>            
            { message && <div className="alert alert-warning">{ message }</div> }            
            <table className="table">
                <thead>
                    <tr>                        
                        <th>Description</th>
                        <th>Is Done?</th>
                        <th>Target Date</th>
                        <th></th>
                        <th></th>
                    </tr>                   
                </thead>
                <tbody>
                    {
                        data.map(i => (
                            <tr key={i.id}>                               
                                <td>{i.description}</td>
                                <td>{i.done.toString()}</td>
                                <td>{i.targetDate.toString()}</td>
                                <td><button className="btn btn-warning" onClick={ () => deleteTodo(i.id) }>Delete</button></td>
                                <td><button className="btn btn-success" onClick={ () => updateTodo(i.id) }>Update</button></td>
                            </tr>                       
                        )) 
                    }
                </tbody>
            </table>
            <div>
                <button className="btn btn-primary m-5" onClick={ addNewTodo }>Add Todo</button>
            </div>
        </div>
    )
}