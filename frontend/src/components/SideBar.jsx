import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import IconBoard from "../assets/IconBoard";
import { logout, reset as authReset } from "../features/auth/authSlice";
import { reset as boardsReset } from "../features/boards/boardsSlice";

const SideBar = ({ boards, setNewBoardModalOpen }) => {
  const { board } = useSelector((state) => state.boards);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(authReset());
    dispatch(boardsReset());
    navigate("/");
  };

  const renderBoards = () => {
    return boards.map((b) => (
      <li key={b._id}>
        <Link
          role="button"
          className={`link ${b._id === board?._id ? "active" : ""}`}
          to={`/boards/${b._id}`}
        >
          <IconBoard /> {b.title}
        </Link>
      </li>
    ));
  };

  return (
    <aside className="sidebar">
      <div className="num-of-boards">All boards {`(${boards.length})`}</div>
      <div className="boards">
        <ul>
          {renderBoards()}
          <li onClick={() => setNewBoardModalOpen(true)}>
            <div className="link">+ Create New Board</div>
          </li>
        </ul>

        {user && (
          <div className="username">
            <div>{user.name}</div>
            <br />
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SideBar;
