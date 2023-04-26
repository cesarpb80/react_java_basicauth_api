const fetchWrapper = {
    get: async(url) => {
        const requestOptions = {           
            method: 'GET'
        };        
        return await fetch(url, requestOptions).then(handleResponse);
    },
    post: async(url, body) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:  JSON.stringify(body)
        };
        return await fetch(url, requestOptions).then(handleResponse);
    },
    put: async(url, body) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        return await fetch(url, requestOptions).then(handleResponse);  
    },
    delete: async(url) => {
        const requestOptions = {
            method: 'DELETE'
        };
        return await fetch(url, requestOptions).then(handleResponse);
    }
};

function handleResponse (response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export default fetchWrapper;