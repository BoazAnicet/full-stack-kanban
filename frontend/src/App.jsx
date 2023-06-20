import { Route, Routes } from "react-router";
import Boards from "./pages/Boards";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Boards />} />
        <Route path="/boards/:id" element={<Boards />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
