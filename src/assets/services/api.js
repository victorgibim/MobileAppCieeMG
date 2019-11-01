import { create } from 'apisauce';

const api = create({
    baseURL: 'http://api.cieemg.org.br:9001',
});

api.addAsyncResponseTransform(response =>{
    if(!response.ok) throw response;
})

export default api;