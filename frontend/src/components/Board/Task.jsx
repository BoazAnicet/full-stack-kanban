import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBoard } from "../../features/boards/boardsSlice";
import Button from "../Button";
import Modal from "../Modal";
import VerticalEllipsis from "../../assets/icon-vertical-ellipsis.svg";
import Select from "react-select";
import options from "../Header/NewTask/options";
import colorStyles from "../Header/NewTask/colorStyles";

const Task = ({ task, index }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedBoard, setEditedBoard] = useState({});
  const [editedTask, setEditedTask] = useState({ ...task });
  const { board } = useSelector((state) => state.boards);
  const dispatch = useDispatch();
  const [popupMenuOpen, setPopupMenuOpen] = useState(false);

  const deleteTask = () => {
    const newTasks = board.tasks.filter((t) => t.id !== task.id);

    const newBoard = { ...board, tasks: newTasks };

    dispatch(editBoard(newBoard));
    console.log("Attempting to delete task");
  };

  const PopupMenu = () => {
    return (
      <div className="popup-menu" onClick={(e) => e.stopPropagation()}>
        <div onClick={() => setEditModalOpen(true)} className="white-color">
          Edit Task
        </div>
        <div onClick={deleteTask} className="red-color">
          Delete Task
        </div>
      </div>
    );
  };

  useEffect(() => {
    setEditedBoard({ ...board });
    console.log(".");
  }, [board]);

  return (
    <>
      <li className="task" onClick={() => setModalOpen(true)}>
        <div className="title">{task.title}</div>
        {/* <div className="subtasks">0 of {task.subtasks.length} subtasks</div> */}
      </li>

      {modalOpen && (
        <Modal closeModal={() => setModalOpen(false)}>
          <div style={{ position: "relative" }}>
            <h2>{task.title}</h2>
            <div className="ellipsis" onClick={() => setPopupMenuOpen(!popupMenuOpen)}>
              <img src={VerticalEllipsis} />
              {popupMenuOpen && <PopupMenu />}
            </div>
          </div>

          <p>{task.description}</p>

          {/* <select>
            <option>Todo</option>
            <option>Doing</option>
            <option>Done</option>
          </select> */}

          <Select
            className="input"
            options={options}
            defaultValue={"todo"}
            value={task.status}
            // onChange={(selectedValue) => setNewTask({ ...newTask, status: selectedValue })}
            styles={colorStyles}
          />
          <br />
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
