import { clientApiService } from "./clientApi.Service";

const todoApiService = {
    getHelloWold: () => {
        return clientApiService.get('/hello-world');
    },
    getHelloWorldBean: () => {
        return clientApiService.get('/hello-world-bean')
    },
    getHelloWorldPathVariable: (username) => {
        return clientApiService.get(`/hello-world/path-variable/${username}`, {
            headers: { Authorization: 'Basic Y2VzYXI6MTIzNDU='}
        })
    },
    getTodosForUser: (username) => {
        return clientApiService.get(`/users/${username}/todos`);
    },
    getTodo: (username, id) => {
        return clientApiService.get(`/users/${username}/todos/${id}`);
    },
    deleteTodoById: (username, id) => {
        return clientApiService.delete(`/users/${username}/todos/${id}`);
    },
    updateTodo: (username, id, todo) => {
        return clientApiService.put(`/users/${username}/todos/${id}`, todo);
    },
    addTodo: (username, todo) => {
        return clientApiService.post(`/users/${username}/todos`, todo);
    },
    executeBasicAuthentication: async (tokenAuth) => {
        return clientApiService.get('/basicauth', {
            headers: { 'Authorization': tokenAuth }
        });
    },
    executeJWTAuthentication: async (username, password) => {
        return clientApiService.post('/authenticate', { username, password })
    }
}

export default todoApiService;