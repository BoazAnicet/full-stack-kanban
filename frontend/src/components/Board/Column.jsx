import PropTypes from "prop-types";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

const Column = ({ column, tasks }) => {
  const renderTasks = () => {
    return tasks.map((task, index) => <Task key={task.id} task={task} index={index} />);
  };

  return (
    <div className="column" key={column.name}>
      <div className="column-title">{column.name}</div>
      <Droppable droppableId={column.id} key={column.name}>
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            {renderTasks()}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

Column.propTypes = {
  column: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
};

export default Column;
