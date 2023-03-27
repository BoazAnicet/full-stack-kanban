import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBoard } from "../../features/boards/boardsSlice";
import Modal from "../Modal";
import Select from "react-select";
import Button from "../Button";

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
    const updatedBoard = {
      ...board,
      tasks: [...board.tasks, { ...newTask, status: newTask.status.value }],
    };
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
          <div style={{ marginBottom: "8px" }}>Status:</div>
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
              // Selected value
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

export default NewTask;
