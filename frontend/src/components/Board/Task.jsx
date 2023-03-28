import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBoard } from "../../features/boards/boardsSlice";
import Button from "../Button";
import Modal from "../Modal";
import VerticalEllipsis from "../../assets/icon-vertical-ellipsis.svg";

const Task = ({ task, index }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedBoard, setEditedBoard] = useState({});
  const [editedTask, setEditedTask] = useState({ ...task });
  const { board } = useSelector((state) => state.boards);
  const dispatch = useDispatch();

  useEffect(() => {
    setEditedBoard({ ...board });
    console.log(".");
  }, [board]);

  return (
    <>
      <li className="task" onClick={() => setModalOpen(true)}>
        <div className="title">{task.title}</div>
        <div className="subtasks">0 of {task.subtasks.length} subtasks</div>
      </li>

      {modalOpen && (
        <Modal closeModal={() => setModalOpen(false)}>
          <h2>
            <div className="ellipsis" onClick={() => console.log("ellipsis clicked")}>
              <img src={VerticalEllipsis} />
            </div>
            {/* Add New Task */}
            {task.title}
          </h2>

          <p>{task.description}</p>

          <select>
            <option>Todo</option>
            <option>Doing</option>
            <option>Done</option>
          </select>

          <div className="buttons">
            <Button fullWidth color="destructive" onClick={() => setModalOpen(false)}>
              Close
            </Button>
          </div>
        </Modal>
      )}

      {/* {editModalOpen && (
        <Modal closeModal={() => setModalOpen(false)}>
          <h3>Edit Task</h3>
          <form onSubmit={() => {}}>
            <label htmlFor="title" className="input label">
              Title:
              <div className="input container">
                <input
                  className="input field"
                  value={editedTask.title}
                  name="title"
                  onChange={(e) => setNewTask({ ...editTask, title: e.target.value })}
                  placeholder="e.g. Take a coffee break"
                />
              </div>
            </label>
          </form>
        </Modal>
      )} */}
    </>
  );
};

export default Task;
