import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBoard } from "../../features/boards/boardsSlice";
import Button from "../Button";
import Modal from "../Modal";
import VerticalEllipsis from "../../assets/icon-vertical-ellipsis.svg";
import Select from "../Select";
import SubTask from "../SubTask";

const Task = ({ task, index }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedBoard, setEditedBoard] = useState({});
  const [editedTask, setEditedTask] = useState({ ...task });
  const { board } = useSelector((state) => state.boards);
  const dispatch = useDispatch();
  const [popupMenuOpen, setPopupMenuOpen] = useState(false);
  // Testing only
  const [subtasks, setSubtasks] = useState([...task.subtasks]);

  const deleteTask = () => {
    const newTasks = board.tasks.filter((t) => t.id !== task.id);

    const newBoard = { ...board, tasks: newTasks };

    dispatch(editBoard(newBoard));
    console.log("Attempting to delete task");
  };

  const openEditModal = () => {
    setEditModalOpen(true);
    setModalOpen(false);
    setPopupMenuOpen(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const newTasks = board.tasks.filter((t) => t.id != task.id);
    const updatedBoard = {
      ...board,
      tasks: [
        ...newTasks,
        {
          ...editedTask,
          status: editedTask.status.value,
        },
      ],
    };
    // const updatedBoard = {
    //   ...board,
    //   tasks: [
    //     ...board.tasks,
    //     {
    //       ...editedTask,
    //       status: editedTask.status.value,
    //     },
    //   ],
    // };

    dispatch(editBoard(updatedBoard));
    setEditModalOpen(false);
  };

  const PopupMenu = () => {
    return (
      <div
        className="popup-menu"
        // style={{ position: "fixed" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div onClick={openEditModal} className="white-color">
          Edit Task
        </div>
        <div onClick={deleteTask} className="red-color">
          Delete Task
        </div>
      </div>
    );
  };

  const renderSubTasks = () => {
    // return task.subtasks.map((st) => (
    // Testing
    return subtasks.map((st, i) => (
      <SubTask
        key={i}
        title={st.title}
        isCompleted={st.isCompleted}
        setSubtasks={setSubtasks}
        index={i}
        subtasks={subtasks}
        task={task}
      />
    ));
  };

  useEffect(() => {
    setEditedBoard({ ...board });
    console.log(".");
  }, [board]);

  return (
    <>
      <li className="task" onClick={() => setModalOpen(true)}>
        <div className="title">{task.title}</div>
        <div className="subtasks">
          {subtasks.filter((st) => st.isCompleted).length} of {task.subtasks.length} subtasks
        </div>
        {/* <div className="subtasks">0 of {task.subtasks.length} subtasks</div> */}
      </li>

      {modalOpen && (
        <Modal closeModal={() => setModalOpen(false)}>
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ margin: 0 }}>{task.title}</h2>
              <div className="ellipsis" onClick={() => setPopupMenuOpen(!popupMenuOpen)}>
                <img src={VerticalEllipsis} />
                {popupMenuOpen && <PopupMenu />}
              </div>
            </div>
          </div>

          <p>{task.description}</p>

          <div className="subtasks">
            {/* <SubTask /> */}
            {renderSubTasks()}
          </div>

          {/* <Select
            // defaultValue={"todo"}
            value={task.status}
            // onChange={(selectedValue) => setNewTask({ ...newTask, status: selectedValue })}
          /> */}
          <br />
          <div className="buttons">
            <Button fullWidth color="destructive" onClick={() => setModalOpen(false)}>
              Close
            </Button>
          </div>
        </Modal>
      )}

      {editModalOpen && (
        <Modal closeModal={() => setEditModalOpen(false)}>
          <h3>Edit Task</h3>
          <form onSubmit={handleEdit}>
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
            <br />
            <label className="input label">
              Description:
              <div className="input container">
                <textarea
                  className="input field"
                  name="description"
                  placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                  rows={4}
                  value={editedTask.description}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                />
              </div>
            </label>
            <br />
            <label className="input label">
              Status:
              <br />
              <br />
              <Select
                value={editedTask.status}
                onChange={(selectedValue) =>
                  setEditedTask({ ...editedTask, status: selectedValue })
                }
              />
            </label>
            <div className="buttons">
              <Button color="destructive" fullWidth onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button color="primary" type="submit" fullWidth>
                Submit
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Task;
