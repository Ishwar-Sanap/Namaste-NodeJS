import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import validateFormData from "../utils/validateFormData";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = validateFormData(null, email, password, null);
    if (!res.result) {
      setErrorMsg(res.error);
      return;
    }
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailID: email,
          password: password,
        },
        { withCredentials: true }, // withCredentials is used to send the cookie which is set by the server in response to the login request.
        // so when client make any subsequent request cookie will be used to authenticate the valid client requests
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setErrorMsg(err?.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-[calc(90vh-90px)]">
      <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <label className="label">Email *</label>
        <input
          type="email"
          className="input mb-3"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password *</label>
        <input
          type="password"
          className="input mb-3"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="textarea-md text-red-500">{errorMsg}</p>
        <p>
          Don't have an account ? <Link to={"/signup"}>SignUp</Link>
        </p>
        <button
          type="submit"
          className="btn btn-primary mt-4"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
