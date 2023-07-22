import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBoard } from "../../features/boards/boardsSlice";
import Button from "../Button";
import Modal from "../Modal";
import VerticalEllipsis from "../../assets/icon-vertical-ellipsis.svg";
import SubTask from "../SubTask";
import { replaceAt } from "../../utils/";
import { IconCross } from "../../assets/Icons";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const { board } = useSelector((state) => state.boards);
  const dispatch = useDispatch();
  const [popupMenuOpen, setPopupMenuOpen] = useState(false);
  const [editedSubtasks, setEditedSubtasks] = useState([...task.subtasks]);

  const deleteTask = (e) => {
    e.preventDefault();

    const newTasks = board.tasks.filter((t) => t.id !== task.id);

    const newCol = { ...board.columns.filter((c) => c.name === task.status.label)[0] };

    newCol.taskIds = [...newCol.taskIds.filter((tid) => tid !== task.id)];

    const newBoard = {
      ...board,
      tasks: newTasks,
      columns: [...board.columns.filter((c) => c.name !== task.status.label), newCol],
    };

    dispatch(editBoard(newBoard));
  };

  const openEditModal = () => {
    setEditModalOpen(true);
    setModalOpen(false);
    setPopupMenuOpen(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const updatedBoard = {
      ...board,
      tasks: replaceAt(
        board.tasks,
        board.tasks.findIndex((t) => t.id === task.id),
        {
          ...editedTask,
          status: editedTask.status,
          subtasks: editedSubtasks,
        }
      ),
    };

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
    return task.subtasks.map((st, i) => (
      <SubTask
        key={i}
        title={st.title}
        isCompleted={st.isCompleted}
        index={i}
        subtasks={task.subtasks}
        task={task}
        taskIndex={index}
      />
    ));
  };

  const addNewEditedSubtask = (e) => {
    e.preventDefault();
    const arr = [...editedSubtasks];
    arr.push({ title: "", isCompleted: false });
    setEditedSubtasks([...arr]);
  };

  const removeEditedSubtask = (e, index) => {
    e.preventDefault();
    const arr = [...editedSubtasks];
    arr.splice(index, 1);
    setEditedSubtasks([...arr]);
  };

  const closeEdit = () => {
    setEditedSubtasks([...task.subtasks]);
    setEditModalOpen(false);
  };

  const renderEditedSubtasks = () => {
    return editedSubtasks.map((st, i) => (
      <div className="input container" key={i}>
        <input
          className="input field"
          value={st.title}
          onChange={(e) => {
            setEditedSubtasks(replaceAt(editedSubtasks, i, { ...st, title: e.target.value }));
          }}
        />
        <button className="delete" onClick={(e) => removeEditedSubtask(e, i)}>
          <IconCross />
        </button>
      </div>
    ));
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index} key={task.id}>
        {(provided) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="task"
            onClick={() => setModalOpen(true)}
          >
            <div className="title">{task.title}</div>
            <br />

            {task.img && <img src={task.img} style={{ width: "100%" }} />}

            {task.subtasks.length > 0 ? (
              <div className="subtasks">
                {task.subtasks.filter((st) => st.isCompleted).length} of {task.subtasks.length}{" "}
                subtasks
              </div>
            ) : (
              <></>
            )}
          </li>
        )}
      </Draggable>

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

          <br />

          {task.img && <img src={task.img} width="100%" />}

          <p>{task.description}</p>

          <div className="subtasks">{renderSubTasks()}</div>

          <br />
          <div className="buttons">
            <Button fullWidth color="destructive" onClick={() => setModalOpen(false)}>
              Close
            </Button>
          </div>
        </Modal>
      )}

      {editModalOpen && (
        <Modal closeModal={closeEdit}>
          <h3>Edit Task</h3>
          <form onSubmit={handleEdit}>
            <label htmlFor="title" className="input label">
              Title
              <div className="input container">
                <input
                  className="input field"
                  value={editedTask.title}
                  name="title"
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  placeholder="e.g. Take a coffee break"
                />
              </div>
            </label>
            <br />
            <label className="input label">
              Description
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

            <div style={{ fontWeight: "bold" }}>Subtasks</div>

            {renderEditedSubtasks()}

            <br />
            <Button color="secondary" fullWidth onClick={addNewEditedSubtask}>
              + Add New Subtask
            </Button>

            <div className="buttons">
              <Button color="destructive" fullWidth onClick={closeEdit}>
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
