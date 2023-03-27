import { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";

const Task = ({ task, index }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <li className="task" onClick={() => setModalOpen(true)}>
        <div className="title">{task.title}</div>
        <div className="subtasks">0 of {task.subtasks.length} subtasks</div>
      </li>

      {modalOpen && (
        <Modal>
          <h2>{task.title}</h2>
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
    </>
  );
};

export default Task;
