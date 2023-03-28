import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VerticalEllipsis from "../../assets/icon-vertical-ellipsis.svg";
import { logout, reset as authReset } from "../../features/auth/authSlice";
import { reset as boardsReset } from "../../features/boards/boardsSlice";
import NewTask from "./NewTask";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { board } = useSelector((state) => state.boards);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(authReset());
    dispatch(boardsReset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="board-name">{board && board.title}</div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <button className="button primary" onClick={() => setNewTaskModalOpen(true)}>
          + Add New Task
        </button>
        <img
          style={{ height: "max-content", marginLeft: "1.5rem" }}
          src={VerticalEllipsis}
          alt="Vertical Ellipsis"
        />

        {newTaskModalOpen && <NewTask setNewTaskModalOpen={setNewTaskModalOpen} />}

        <ul>
          {/* <li>
            <Link to={"/boards"}>Boards</Link>
          </li> */}
          {user ? (
            <>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
              <li>
                <div className="username">{user.name}</div>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/register"}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
