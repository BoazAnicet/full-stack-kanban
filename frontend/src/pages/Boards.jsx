import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Board from "../components/Board";
import Button from "../components/Button";
import Header from "../components/Header";
import Modal from "../components/Modal";
import SideBar from "../components/SideBar";
import { createBoard, fetchAllBoards } from "../features/boards/boardsSlice";

const Boards = () => {
  const [title, setTitle] = useState("");
  const { boards } = useSelector((state) => state.boards);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newBoardModalOpen, setNewBoardModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchAllBoards());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBoard({ title, tasks: [] }));
    setNewBoardModalOpen(false);
    setTitle("");
  };

  return (
    <div id="boards">
      <Header />
      <div style={{ width: "100%", display: "flex" }}>
        <SideBar boards={boards} setNewBoardModalOpen={setNewBoardModalOpen} />

        {boards ? <Board /> : ""}

        {newBoardModalOpen && (
          <Modal closeModal={() => setNewBoardModalOpen(false)}>
            <h3>Add New Board</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name" className="input label">
                Name
                <div className="input container">
                  <input
                    name="name"
                    className="input field"
                    placeholder="e.g. Web Design"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
              </label>
              <br />
              <br />
              <Button color="primary" variant="large" fullWidth>
                Create New Board
              </Button>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Boards;
