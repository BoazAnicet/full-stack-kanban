import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VerticalEllipsis from "../../assets/icon-vertical-ellipsis.svg";
import {
  LogoLight,
  LogoMobile,
  IconAddTaskMobile,
  IconChevronDown,
  IconChevronUp,
} from "../../assets/Icons";
import { deleteBoard, editBoard } from "../../features/boards/boardsSlice";
import NewTask from "./NewTask";
import Modal from "../Modal";
import Button from "../Button";
import { toast } from "react-toastify";
import { useWindowSize } from "@uidotdev/usehooks";

const Header = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { board, isSuccess, message, isError } = useSelector((state) => state.boards);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ ...board });
  const [popupMenuOpen, setPopupMenuOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const size = useWindowSize();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError]);

  const handleDelete = () => {
    setPopupMenuOpen(false);
    dispatch(deleteBoard(board));
    if (isSuccess) {
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
      <div className="popup-menu" style={{ right: "10px" }} onClick={(e) => e.stopPropagation()}>
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
      <div className="logo-container">{size.width > 500 ? <LogoLight /> : <LogoMobile />}</div>
      <div className="board-info">
        <div className="board-name">
          {board && board.title}
          {size.width < 500 && (
            <div className="chevron" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <IconChevronUp /> : <IconChevronDown />}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          {board && (
            <button className="button primary" onClick={() => setNewTaskModalOpen(true)}>
              {size.width > 500 ? "+ Add New Task" : <IconAddTaskMobile />}
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

          {board && (
            <div
              className="ellipsis"
              style={{ position: "relative" }}
              onClick={() => setPopupMenuOpen(!popupMenuOpen)}
            >
              <img src={VerticalEllipsis} />
              {popupMenuOpen && <PopupMenu />}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
