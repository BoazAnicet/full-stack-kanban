import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VerticalEllipsis from "../../assets/icon-vertical-ellipsis.svg";
import { logout, reset as authReset } from "../../features/auth/authSlice";
import {
  reset as boardsReset,
  deleteBoard,
  changeBoard,
  editBoard,
} from "../../features/boards/boardsSlice";
import NewTask from "./NewTask";
import Modal from "../Modal";
import Button from "../Button";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { board, isSuccess, message, isError } = useSelector((state) => state.boards);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ ...board });
  const [popupMenuOpen, setPopupMenuOpen] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(authReset());
    dispatch(boardsReset());
    navigate("/");
  };

  const handleDelete = () => {
    setPopupMenuOpen(false);
    dispatch(deleteBoard(board));
    if (isSuccess) {
      dispatch(changeBoard(null));
      navigate("/");
    }
  };

  const openEdit = () => {
    setEditForm({ ...board });
    setPopupMenuOpen(false);
    setEditModalOpen(true);
  };

  const handleEdit = (e) => {
    e.preventDefault();

    if (editForm.title.length <= 0) {
      return toast.error("Title must be at least 1 character.");
    }

    dispatch(editBoard(editForm));

    if (isSuccess) {
      setEditModalOpen(false);
    }
  };

  const PopupMenu = () => {
    return (
      <div className="popup-menu" onClick={(e) => e.stopPropagation()}>
        <div onClick={openEdit} className="white-color">
          Edit Board
        </div>
        <div onClick={handleDelete} className="red-color">
          Delete Board
        </div>
      </div>
    );
  };

  return (
    <header className="header">
      <div className="board-name">{board && board.title}</div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {board && (
          <button className="button primary" onClick={() => setNewTaskModalOpen(true)}>
            + Add New Task
          </button>
        )}

        {newTaskModalOpen && <NewTask setNewTaskModalOpen={setNewTaskModalOpen} />}

        {editModalOpen && (
          <Modal closeModal={() => setEditModalOpen(false)}>
            <form onSubmit={handleEdit}>
              <label htmlFor="title" className="input label">
                Title:
                <div className="input container">
                  <input
                    className="input field"
                    value={editForm.title}
                    name="title"
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="e.g. Take a coffee break"
                  />
                </div>
              </label>

              <div className="buttons">
                <Button onClick={() => setEditModalOpen(false)} color="destructive" fullWidth>
                  Cancel
                </Button>
                <Button type="submit" color="primary" fullWidth>
                  Submit
                </Button>
              </div>
            </form>
          </Modal>
        )}

        <ul>
          {user ? (
            <>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
              <li>
                <div className="username">{user.name}</div>
              </li>
              {board && (
                <li>
                  <div className="ellipsis" onClick={() => setPopupMenuOpen(!popupMenuOpen)}>
                    <img src={VerticalEllipsis} />
                    {popupMenuOpen && <PopupMenu />}
                  </div>
                </li>
              )}
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
