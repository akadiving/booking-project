import axios from 'axios';
const baseURL = 'https://colab-booking.herokuapp.com/api/login/';

const nodeLogin = (name, email) => {
	console.log(name, email);
	axios
		.post(baseURL, {
			name : name,
        	email : email
		})
		.then((res) => {
			console.log(res)
		});
};


export default nodeLogin;
