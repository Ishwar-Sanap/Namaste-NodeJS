import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("elon@gmail.com");
  const [password, setPassword] = useState("Elon@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailID: email,
          password: password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto mt-20">
      <label className="label">Email</label>
      <input
        type="email"
        className="input mb-3"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="label">Password</label>
      <input
        type="password  mb-3"
        className="input"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-neutral mt-4"
        onClick={handleLogin}
      >
        Login
      </button>
    </form>
  );
};

export default Login;
