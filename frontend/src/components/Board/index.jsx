import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchBoard, changeBoard } from "../../features/boards/boardsSlice";
import Task from "./Task";

const Board = () => {
  const dispatch = useDispatch();
  // const { boards, isLoading } = useSelector((state) => state.boards);
  const { board, boards, isLoading } = useSelector((state) => state.boards);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  // const [board, setBoard] = useState({});

  useEffect(() => {
    if (id) {
      // dispatch(fetchBoard(id));
      // setBoard(boards.filter((b) => b._id === id)[0]);
      dispatch(changeBoard(boards.filter((b) => b._id === id)[0]));

      setLoading(false);
    }
  }, [id]);

  const renderTasks = (column) => {
    return board.tasks
      .filter((t) => t.status === column)
      .map((t, i) => <Task key={t.title} task={t} index={i} board={board} />);
  };

  return (
    <div className="board">
      {loading ? (
        // {isLoading ? (
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
