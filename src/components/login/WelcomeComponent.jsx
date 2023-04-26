import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import todoApiService from '../../api/todoApi.Service';


export default function Welcome () {

    const { username } = useParams();
    const [message, setMessage] = useState(null);

    function callHelloWorld() {
        
        // axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
        // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        // axios.get('http://localhost:8080/hello-world')
        // .then((response) => successResponse(response))
        // .catch((error) => errorResponse(error))
        // .finally(() => console.log("called"))

        todoApiService.getHelloWorldPathVariable(username)        
        .then((response) => successResponse(response))
        .catch((error) => errorResponse(error))
        .finally(() => console.log("called"))
         
    }

    function successResponse(response) {        
        setMessage(response.data.message);
    }

    function errorResponse(error) {
        console.log(error);
    }

    return (
        <div className="welcome">
            <div>
                <h1>Welcome { username }</h1>
                <div>
                    Manage your todos <Link to="/todos">Go here</Link>
                    <button className="btn btn-success m-5" onClick={ callHelloWorld }>Call Hello World</button>
                </div>
                <div className="text-info">
                    { message }
                </div>                   
            </div>
        </div>
    )
}