import axios from 'axios'; // Import axios
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarForLogin from './NavBars/NavBarForLogin';

const UserSignIn = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(credentials); 
    try {
      const response = await axios.get(`http://localhost:8081/user/userLogin/${credentials.email}/${credentials.password}`);
      
      // Check if the response indicates a successful login (adjust based on your backend response)
      if (response.status === 202) {
        console.log(response.data);
        console.log('Login successful');
        navigate('/homepage'); // Redirect to the dashboard or desired page
      } else {
        
        console.log('Invalid credentials'); // Log a message for invalid credentials
        // Handle invalid login attempt, display a message, or take appropriate action
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error or show a message to the user
    }
  };

  return (
    <div>
      <NavBarForLogin/>
      <div className='container w-50 mt-5'>
        <div className='card shadow p-3'>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <h2>User Login</h2>
              <label htmlFor="exampleInputemail1" className="form-label">email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputemail1"
                aria-describedby="emailHelp"
                name="email"
                value={credentials.email}
                onChange={changeHandler}
              />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputpassword1" className="form-label">password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputpassword1"
                name='password'
                value={credentials.password}
                onChange={changeHandler}
              />
            </div>
            <button type="submit" className="btn btn-success">SignIn</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSignIn;
