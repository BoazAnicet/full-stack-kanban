import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchBoard } from "../features/boards/boardsSlice";
import Button from "./Button";
import Modal from "./Modal";

const Board = () => {
  const dispatch = useDispatch();
  const { board, isLoading } = useSelector((state) => state.boards);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(fetchBoard(id));
    }
  }, []);

  const renderTasks = (column) => {
    return board.tasks
      .filter((t) => t.status === column)
      .map((t, i) => <Task key={t.title} task={t} index={i} />);
  };

  const handleEdit = () => {};

  return (
    <div className="board">
      <div className="content">
        {board && (
          <>
            <div className="column">
              <div className="column-title">Todo</div>
              <ul>{renderTasks("todo")}</ul>
            </div>
            <div className="column">
              <div className="column-title">Doing</div>
              <ul>{renderTasks("doing")}</ul>
            </div>
            <div className="column">
              <div className="column-title">Done</div>
              <ul>{renderTasks("done")}</ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

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

export default Board;
