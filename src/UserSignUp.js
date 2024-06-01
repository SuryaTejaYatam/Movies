import axios from 'axios';
import React, { useState } from 'react';
import NavBarForReg from './NavBars/NavBarForReg';

const UserSignUp = () => {
  //const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const changeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(credentials);

    // Validation check for password
    if (!credentials.password.trim()) {
      console.error("Register Number cannot be empty.");
      return; // Do not proceed with form submission
    }

    try {
      await axios.post(
        "http://localhost:8000/userAuthentication/register",
        credentials
      );
      setMessage("Email Sends Successfully , Verify The Email And Login");
    
    } catch (error) {
      console.error("Error adding userSignUp:", error);
      if (error.response) {
        console.log("Server response:", error.response.data);
        // You can handle specific error messages here
      }
    }
  };

  return (
    <div>
      <NavBarForReg />
      <div className="container w-50 mt-5">
        <div className="card shadow p-3">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <h2>USER REGISTRETAION</h2>
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={credentials.firstName}
                onChange={changeHandler}
              />

              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={credentials.lastName}
                onChange={changeHandler}
              />

              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                aria-describedby="emailHelp"
                value={credentials.email}
                onChange={changeHandler}
              />
              <div className="form-text">
                We'll never share your email with anyone else.
              </div>

              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="text"
                className="form-control"
                name="password"
                value={credentials.password}
                onChange={changeHandler}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <div className="row mt-2">
            <div className="col-12 text-center">
              <p className="text-Success">{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
