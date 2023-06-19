import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { LogoLight } from "../assets/Icons";
import Button from "../components/Button";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const { name, email, password, password2 } = formData;

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

    if (password !== password2) {
      toast.error("Passwords do not match.");
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div id="register">
          <div className="form">
            <div className="logo">
              <LogoLight />
            </div>

            <form onSubmit={handleSubmit}>
              {/* <label htmlFor="name">
                Name
                <input name="name" id="name" type="text" value={name} onChange={handleChange} />
              </label>
              <label htmlFor="email">
                Email
                <input name="email" id="email" type="text" value={email} onChange={handleChange} />
              </label> */}

              <label htmlFor="name" className="input label">
                Name
                <div className="input container">
                  <input
                    className="input field"
                    name="name"
                    id="name"
                    type="text"
                    value={name}
                    onChange={handleChange}
                  />
                </div>
              </label>

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

              {/* <label htmlFor="password">
                Password
                <input
                  name="password"
                  id="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                />
              </label> */}

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

              {/* <label htmlFor="confirm-password">
                Confirm Password
                <input
                  name="password2"
                  id="password2"
                  type="password"
                  value={password2}
                  onChange={handleChange}
                />
              </label> */}

              <label htmlFor="confirm-password" className="input label">
                Confirm Password
                <div className="input container">
                  <input
                    className="input field"
                    name="password2"
                    id="password2"
                    type="password"
                    value={password2}
                    onChange={handleChange}
                  />
                </div>
              </label>

              <Button color="primary" type="submit" fullWidth>
                Register
              </Button>
              <hr />
              <Button color="secondary" onClick={() => navigate("/login")} fullWidth>
                Login
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
  // return (
  //   <div>
  //     {isLoading ? (
  //       <Spinner />
  //     ) : (
  //       <>
  //         <div>Register</div>
  //         <form onSubmit={handleSubmit}>
  //           <label htmlFor="name">
  //             Name
  //             <input name="name" id="name" type="text" value={name} onChange={handleChange} />
  //           </label>
  //           <label htmlFor="email">
  //             Email
  //             <input name="email" id="email" type="text" value={email} onChange={handleChange} />
  //           </label>
  //           <label htmlFor="password">
  //             Password
  //             <input
  //               name="password"
  //               id="password"
  //               type="password"
  //               value={password}
  //               onChange={handleChange}
  //             />
  //           </label>
  //           <label htmlFor="confirm-password">
  //             Confirm Password
  //             <input
  //               name="password2"
  //               id="password2"
  //               type="password"
  //               value={password2}
  //               onChange={handleChange}
  //             />
  //           </label>
  //           <button type="submit">Register</button>
  //         </form>
  //       </>
  //     )}
  //   </div>
  // );
};

export default Register;
