import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const replaceAt = (array, index, value) => {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
};

const SubTask = ({ title, isCompleted, setSubtasks, index, subtasks, task }) => {
  const checkbox = useRef();
  const { board } = useSelector((state) => state.boards);

  useEffect(() => {
    if (isCompleted) {
      checkbox.current.checked = true;
    }
  }, []);

  const change = () => {
    let newSubtasks = [...subtasks];
    newSubtasks = replaceAt(newSubtasks, index, { title, isCompleted: checkbox.current.checked });
    setSubtasks(newSubtasks);
  };

  return (
    <label className="subtask">
      <input ref={checkbox} type="checkbox" onChange={change} />
      <span className="checkmark" />
      <div className={`label ${checkbox?.current?.checked ? "checked" : ""}`}>{title}</div>
    </label>
  );
};

export default SubTask;
