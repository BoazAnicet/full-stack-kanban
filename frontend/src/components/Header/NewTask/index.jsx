import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBoard } from "../../../features/boards/boardsSlice";
import Button from "../../Button";
import Modal from "../../Modal";
import Select from "react-select";
import options from "./options";
import colorStyles from "./colorStyles";
import VerticalEllipsis from "../../../assets/icon-vertical-ellipsis.svg";

const NewTask = ({ setNewTaskModalOpen }) => {
  const dispatch = useDispatch();
  const { board } = useSelector((state) => state.boards);
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
    <Modal closeModal={() => setNewTaskModalOpen(false)}>
      {/* <h3></h3> */}
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

          <Select
            className="input"
            options={options}
            defaultValue={"todo"}
            value={newTask.status}
            onChange={(selectedValue) => setNewTask({ ...newTask, status: selectedValue })}
            styles={colorStyles}
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
