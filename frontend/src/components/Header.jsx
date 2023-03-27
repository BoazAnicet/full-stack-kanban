import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import VerticalEllipsis from "../assets/icon-vertical-ellipsis.svg";
import Modal from "./Modal";
import { editBoard } from "../features/boards/boardsSlice";

import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { board } = useSelector((state) => state.boards);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "todo",
    subtasks: [{ title: "Sign up page", isComplete: false }],
  });

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const createTask = () => {};

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
          <li>
            <Link to={"/boards"}>Boards</Link>
          </li>
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

const NewTask = ({ setNewTaskModalOpen }) => {
  const { board } = useSelector((state) => state.boards);

  const dispatch = useDispatch();

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "",
    subtasks: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBoard = { ...board, tasks: [...board.tasks, newTask] };
    console.log("task created");
    dispatch(editBoard(updatedBoard));
    setNewTaskModalOpen(false);
  };

  const renderOptions = () => {
    let arr = ["Todo"];

    return arr.map((el, i) => (
      <option key={el} value={el}>
        {el}
      </option>
    ));
  };

  return (
    <Modal>
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            value={newTask.title}
            name="title"
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="e.g. Take a coffee break"
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will 
              recharge the batteries a little."
            rows={4}
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
        </label>
        {/* <label>
          Subtasks:
          <input placeholder="e.g. Make coffee" />
        </label> */}

        <label>
          Status:
          <select
            name="status"
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
            {/* {renderOptions()} */}
          </select>
        </label>

        <Button color={"primary"} variant={"large"} type="submit" fullWidth>
          Create Task
        </Button>
      </form>
    </Modal>
  );
};

export default Header;
