import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import VerticalEllipsis from "../assets/icon-vertical-ellipsis.svg";
import Modal from "./Modal";
import { editBoard } from "../features/boards/boardsSlice";
import { logout, reset } from "../features/auth/authSlice";
import Select from "react-select";

const options = [
  { value: "todo", label: "Todo" },
  { value: "doing", label: "Doing" },
  { value: "done", label: "Done" },
];

const colorStyles = {
  control: (styles, state) => ({
    ...styles,
    borderColor: state.isFocused ? "#a8a4ff" : "#828fa340",
    color: "#000000",
  }),
};

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { board } = useSelector((state) => state.boards);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
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
    status: "todo",
    subtasks: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBoard = { ...board, tasks: [...board.tasks, newTask] };
    dispatch(editBoard(updatedBoard));
    setNewTaskModalOpen(false);
  };

  return (
    <Modal>
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className="input label">
          Title:
          <div className="input container">
            <input
              className="input field"
              value={newTask.title}
              name="title"
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="e.g. Take a coffee break"
            />
          </div>
        </label>
        <br />
        <label className="input label">
          Description:
          <div className="input container">
            <textarea
              className="input field"
              name="description"
              placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
              rows={4}
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
          </div>
        </label>
        <br />
        {/* <label>
          Subtasks:
          <input placeholder="e.g. Make coffee" />
        </label> */}

        <label className="input label">
          Status:
          {/* <select
            name="status"
            defaultValue={"todo"}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select> */}
          <Select
            className="input"
            options={options}
            defaultValue={"todo"}
            value={newTask.status}
            onChange={(selectedValue) => setNewTask({ ...newTask, status: selectedValue })}
            // onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            // styles={colorStyles}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: "#a8a4ff",
                color: "#FFFFFF",
                backgroundColor: "transparent",
              }),
              // Single option in list
              // option: (baseStyles, state) => ({
              //   ...baseStyles,
              //   backgroundColor: "#2b2c37",
              //   color: "#FFF",
              // }),
              // Arrow
              dropdownIndicator: (baseStyles, state) => ({
                ...baseStyles,
                // backgroundColor: "#635fc7",
                color: "#635fc7",
              }),
              menuList: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: "#2b2c37",
                color: "#FFF",
              }),
              // Initial text ex. "Select..."
              placeholder: (baseStyles, state) => ({
                ...baseStyles,
                // backgroundColor: "#2b2c37",
                color: "#FFF",
              }),
              singleValue: (baseStyles, state) => ({
                ...baseStyles,
                color: "#FFF",
              }),
            }}
          />
        </label>
        <br />
        <br />

        <Button color={"primary"} variant={"large"} type="submit" fullWidth>
          Create Task
        </Button>
      </form>
    </Modal>
  );
};

export default Header;
