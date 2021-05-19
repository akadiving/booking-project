import axios from 'axios';

const baseURL = 'https://colab-booking.herokuapp.com/';

    const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        accept: 'application/json',
        },
    });

export default axiosInstance;