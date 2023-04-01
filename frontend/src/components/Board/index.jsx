import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchBoard } from "../../features/boards/boardsSlice";
import Task from "./Task";

const Board = () => {
  const dispatch = useDispatch();
  const { board, isLoading } = useSelector((state) => state.boards);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchBoard(id));
    }
  }, [id]);

  const renderTasks = (column) => {
    return board.tasks
      .filter((t) => t.status === column)
      .map((t, i) => <Task key={t.title} task={t} index={i} board={board} />);
  };

  return (
    <div className="board">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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
      )}
    </div>
  );
};

export default Board;
