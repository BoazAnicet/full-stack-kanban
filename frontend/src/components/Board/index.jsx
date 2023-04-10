import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchBoard, editBoard } from "../../features/boards/boardsSlice";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

const Board = () => {
  const dispatch = useDispatch();
  const { board, isLoading } = useSelector((state) => state?.boards);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchBoard(id));
    }
  }, [id]);

  const renderColumns = () => {
    return board.columnOrder.map((colName) => {
      const column = board.columns.filter((c) => c.name === colName)[0];

      const tasks = column.taskIds.map((taskId) => board.tasks.filter((t) => t.id === taskId)[0]);

      return <Column key={column.id} column={column} tasks={tasks} />;
    });
  };

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (destination === undefined || destination === null) return null;

    if (source.droppableId === destination.droppableId && destination.index === source.index) {
      return null;
    }

    const start = board.columns.filter((b) => b.id === source.droppableId)[0];
    const end = board.columns.filter((b) => b.id === destination.droppableId)[0];

    if (start === end) {
      const newTaskIds = [...start.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newCol = {
        ...start,
        taskIds: newTaskIds,
      };

      const newBoard = {
        ...board,
        columns: [...board.columns.filter((c) => c.id !== newCol.id), newCol],
      };

      dispatch(editBoard(newBoard));
    } else {
      const startTaskIds = [...start.taskIds];
      startTaskIds.splice(source.index, 1);

      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const endTaskIds = [...end.taskIds];
      endTaskIds.splice(destination.index, 0, draggableId);
      const newEnd = {
        ...end,
        taskIds: endTaskIds,
      };

      const newBoard = {
        ...board,
        columns: [
          ...board.columns.filter((c) => c.id !== newStart.id && c.id !== end.id),
          newStart,
          newEnd,
        ],
      };

      dispatch(editBoard(newBoard));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="content">{board && <>{renderColumns()}</>}</div>
        )}
      </div>
    </DragDropContext>
  );
};

export default Board;
