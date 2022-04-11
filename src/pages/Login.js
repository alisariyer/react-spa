import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import FormError from "../components/FormError";

function Login() {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const [errorMessage, setErrorMessage] = useState(null);

  function handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;
    setCredentials(prevState => ({...prevState, [itemName]: itemValue}))
  }

  function handleSubmit(e) {
    e.preventDefault();
    const loginInfo = {};
      loginInfo.email = credentials.email;
      loginInfo.password = credentials.password;
      signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
        .then(() => {
          navigate('/meetings', { replace: true});
        })
        .catch(error => {
          const errCode = error.code;
          const errMessage = error.message;
          setErrorMessage(`${errCode}: ${errMessage}`)
        })
    }

  return (
    <form className="mt-3" onSubmit={handleSubmit} autoComplete="off">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card bg-light">
              <div className="card-body">
                <h3 className="fw-light mb-3">Log in</h3>
                {errorMessage && <FormError errorMessage={errorMessage} />}
                <div className="mb-3">
                  <label className="form-label visually-hidden" htmlFor="email">Email</label>
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-0 text-end">
                  <button className="btn btn-primary" type="submit">Log in</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
  }

export default Login;
