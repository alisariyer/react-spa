import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "./Firebase";
import FormError from "./FormError";

function Register({ registerUser }) {
  const [regInfo, setRegInfo] = useState({
    displayName: "",
    email: "",
    passOne: "",
    passTwo: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  function handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;
    setRegInfo((prevState) => ({ ...prevState, [itemName]: itemValue}));
  }
  
  useEffect(() => {
    const errMessage = regInfo.passOne !== regInfo.passTwo ? "Password do not match" : null;
    setErrorMessage(errMessage);
  }, [regInfo]);

  function handleSubmit(e) {
    const registrationInfo = {};
    if (regInfo.passOne !== regInfo.passTwo) {
      setErrorMessage("Passwords do not match!");
    } else {
      registrationInfo.displayName = regInfo.displayName;
      registrationInfo.email = regInfo.email;
      registrationInfo.password = regInfo.passOne;
      createUserWithEmailAndPassword(auth, registrationInfo.email, registrationInfo.password)
        .then(() => {
          registerUser(regInfo.displayName);
        })
        .catch(error => {
          const errCode = error.code;
          const errMessage = error.message;
          setErrorMessage(`${errCode}: ${errMessage}`)
        })
    }
    e.preventDefault();
  }

  return (
    <form className="mt-3" onSubmit={handleSubmit}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card bg-light">
              <div className="card-body">
                <h3 className="fw-light mb-3">Register</h3>
                {errorMessage && <FormError errorMessage={errorMessage} />}
                <div className="mb-3 col-sm-12">
                  <label
                    className="form-label visually-hidden"
                    htmlFor="displayName"
                  >
                    Display Name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="displayName"
                    placeholder="Display Name"
                    name="displayName"
                    value={regInfo.displayName}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label visually-hidden" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    name="email"
                    value={regInfo.email}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div className="row mb-3 gx-3">
                  <div className="col-sm-6">
                    <input
                      className="form-control"
                      type="password"
                      name="passOne"
                      placeholder="Password"
                      value={regInfo.passOne}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-6">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Repeat Password"
                      name="passTwo"
                      value={regInfo.passTwo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="text-end mb-0">
                  <button className="btn btn-primary" type="submit">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Register;
