import PropTypes from "prop-types";
import Task from "./Task";

const Column = ({ column, tasks }) => {
  const renderTasks = () => {
    return tasks.map((task, index) => {
      return <Task key={task.id} task={task} index={index} />;
    });
  };

  return (
    <div className="column" key={column.name}>
      <div className="column-title">{column.name}</div>
      <ul>{renderTasks()}</ul>
    </div>
  );
};

Column.propTypes = {
  column: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
};

export default Column;
