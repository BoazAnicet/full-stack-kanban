import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import { login, reset } from "../features/auth/authSlice";
import { LogoLight } from "../assets/Icons";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const { email, password } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  if (isLoading) return <Spinner />;

  return (
    <div id="login">
      <div className="form">
        <div className="logo">
          <LogoLight />
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="input label">
            Email
            <div className="input container">
              <input
                className="input field"
                name="email"
                id="email"
                type="text"
                value={email}
                onChange={handleChange}
              />
            </div>
          </label>

          <label htmlFor="password" className="input label">
            Password
            <div className="input container">
              <input
                className="input field"
                name="password"
                id="password"
                type="password"
                value={password}
                onChange={handleChange}
              />
            </div>
          </label>

          <Button color="primary" type="submit" fullWidth>
            Login
          </Button>
          <hr />
          <Button color="secondary" fullWidth onClick={() => navigate("/register")}>
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
