import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (password !== confirmPassword) {
      setErrorMsg("Password doesn't match");
      return;
    }
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailID: email,
          password: password,
        },
      );
      setShowToast(true);

      //after 3 sec disable the toast
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      navigate("/login");
    } catch (err) {
      console.log(err)
      setErrorMsg(err?.response?.data || "Something went wrong");
    }
  };
  return (
    <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto mt-5">
      <label className="label"> First Name </label>
      <input
        type="text"
        className="input mb-1"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <label className="label"> Last Name </label>
      <input
        type="text"
        className="input mb-1"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <label className="label">Email</label>
      <input
        type="email"
        className="input mb-1"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="label">Password</label>
      <input
        type="password"
        className="input mb-1"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <label className="label">Confirm Password</label>
      <input
        type="password"
        className="input mb-1"
        placeholder="Confirm Password"
        value={confirmPassword}
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <p className="textarea-md text-red-500">{errorMsg}</p>
      <p>
        Already have an account ? <Link to={"/login"}>Login</Link>
      </p>
      <button
        type="submit"
        className="btn btn-neutral mt-4"
        onClick={handleSignUp}
      >
        SignUp
      </button>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile created successfully</span>
          </div>
        </div>
      )}
    </form>
  );
};

export default SignUp;
