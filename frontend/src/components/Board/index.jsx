"use strict";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchBoard, changeBoard } from "../../features/boards/boardsSlice";
import Column from "./Column";

const Board = () => {
  const dispatch = useDispatch();
  const { board, isLoading, boards } = useSelector((state) => state?.boards);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchBoard(id));
      // dispatch(changeBoard(boards.filter((b) => b._id === id)[0]));
    }
  }, [id]);

  const renderColumns = () => {
    return board.columns.map((c, i) => (
      <Column
        key={c.id}
        column={c}
        tasks={board.tasks.filter((t) => t.status.value === c.name.toLowerCase())}
      />
    ));
  };

  return (
    <div className="board">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="content">{board && <>{renderColumns()}</>}</div>
      )}
    </div>
  );
};

export default Board;
