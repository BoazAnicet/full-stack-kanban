import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { replaceAt } from "../utils";
import { editBoard } from "../features/boards/boardsSlice";

const SubTask = ({ title, isCompleted, index, subtasks, task, taskIndex }) => {
  const checkbox = useRef();
  const { board } = useSelector((state) => state.boards);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isCompleted) {
      checkbox.current.checked = true;
    }
  }, []);

  const change = () => {
    let newSubtasks = [...subtasks];

    newSubtasks = replaceAt(newSubtasks, index, { title, isCompleted: checkbox.current.checked });

    const newTask = {
      ...task,
      subtasks: newSubtasks,
    };

    const newTasks = [...board.tasks.filter((t) => t.id !== newTask.id)];

    const newBoard = {
      ...board,
      tasks: [...newTasks, newTask],
    };

    dispatch(editBoard(newBoard));
  };

  return (
    <label className="subtask">
      <input ref={checkbox} type="checkbox" onChange={change} />
      <span className="checkmark" />
      <div className={`label ${isCompleted ? "checked" : ""}`}>{title}</div>
    </label>
  );
};

export default SubTask;
