import React, { useState, useEffect } from "react";

function Register() {
  const [userInfo, setUserInfo] = useState({
    displayName: "",
    email: "",
    passOne: "",
    passTwo: "",
  });

  function handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;
    setUserInfo((prevState) => ({ ...prevState, [itemName]: itemValue }));
  }

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <form className="mt-3">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card bg-light">
              <div className="card-body">
                <h3 className="fw-light mb-3">Register</h3>
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
                    value={userInfo.displayName}
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
                    value={userInfo.email}
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
                      value={userInfo.passOne}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-6">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Repeat Password"
                      name="passTwo"
                      value={userInfo.passTwo}
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
