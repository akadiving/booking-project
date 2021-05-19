import axios from 'axios';
const baseURL = 'https://colab-booking.herokuapp.com/api/admin/login/';

const adminLogin = (email, password) => {
	console.log(email, password);
	axios
		.post(baseURL, {
			email : email,
        	password : password
		})
		.then((res) => {
			console.log(res)
		});
};


export default adminLogin;