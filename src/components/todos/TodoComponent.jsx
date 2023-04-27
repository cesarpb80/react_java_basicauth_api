import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../login/security/AuthContext";
import todoApiService from "../../api/todoApi.Service";
import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import moment from "moment/moment";

export default function TodoComponent () {

    const { id } = useParams();
    const authContext = useAuth();
    const username = authContext.username;
    const [description, setDescription] = useState("");
    const [targetDate, setTargetDate] = useState("");
    const navigate = useNavigate();

    function getTodo() {        
        if(parseInt(id) !== -1) {
            todoApiService.getTodo(username, id).then(response => {         
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            }).catch(error => {
                console.log(error)
            })
        }
    }

    function onSubmit (values, onSubmitProps) {       
        
        const todo = { 
            id: id, 
            username: username, 
            description: values.description,
            targetDate: values.targetDate, 
            done: false,
        }

        if(id === -1) {
            todoApiService.addTodo(username, todo)
            .then(() => {
                navigate('/todos')               
            }).catch(error => {
                console.log(error)
            })            
        } else {
            todoApiService.updateTodo(username, id, todo)
            .then(() => {
                navigate('/todos')               
            }).catch(error => {
                console.log(error)
            })
        }    
        onSubmitProps.resetForm();        
    }

    function validate(values) {
        let errors = {};

        if(values.description.length < 5) { errors.description = "Al menos 5 caracteres" }
        if(values.targetDate === null || values.targetDate === '' || !moment(values.target).isValid()) { errors.targetDate = "Coloque un valor fecha" }

        return errors;
    }

    useEffect(() => getTodo, [id]);

    return(
        <div className="container">
           <Formik initialValues={{ description, targetDate }} 
                enableReinitialize={ true } 
                onSubmit={ onSubmit }
                validate={ validate }
                validateOnChange={ false }
                validateOnBlur={ false }              
           >                      
                <Form>
                    <ErrorMessage name="description" component="div" className="alert alert-warning" />
                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                    <fieldset className="form-group">
                        <label>Description</label>
                        <Field type="text" className="form-control" name="description"></Field>
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Target Date</label>
                        <Field type="date" className="form-control" name="targetDate"></Field>
                    </fieldset>
                    <button className="btn btn-success m-5" type="submit">Save</button>
                </Form>             
            </Formik>
        </div>
    )
}