import axios from 'axios';

const nodeServiceApi = axios.create({
    baseURL: 'http://localhost:6002',
});


export const weather = () => nodeServiceApi.get(`/weather`);
export const dateTime = () => nodeServiceApi.get(`/datetime`);

const apis = {
    weather,
    dateTime,
}

export default apis;