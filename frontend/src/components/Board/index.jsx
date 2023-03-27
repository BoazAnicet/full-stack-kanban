import { useState } from "react";
import Button from "../Button";
import Column from "./Column";
import Header from "../Header";
import Modal from "../Modal";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

const Board = ({ board }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newColunModalOpen, setNewColumnModalOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const dispatch = useDispatch();

  const renderColumns = () => {
    return board.columnOrder.map((columnId, index) => {
      const column = board.columns[`${columnId}`];

      const tasks = column.taskIds.map(
        (taskId) => board.tasks.filter((task) => task.id === taskId)[0]
      );

      return <Column key={column.name} column={column} tasks={tasks} />;
    });
  };

  // const createColumn = (e) => {
  //   // e.preventDefault();
  //   console.log("column created!");
  //   dispatch(
  //     createColumnAction(board.id, {
  //       name: newColumnTitle,
  //       id: "column-5",
  //       taskIds: [],
  //     })
  //   );
  //   setNewColumnModalOpen(false);
  //   // setNewColumnTitle("");
  // };

  const NewColumnModal = () => {
    return (
      <Modal>
        <form onSubmit={createColumn}>
          <label htmlFor="title">Column Name</label>
          <input
            name="title"
            placeholder="ex. Todo"
            onChange={(e) => setNewColumnTitle(e.target.value)}
            value={newColumnTitle}
          />
          <Button type="submit" color="primary" fullWidth variant="large">
            Create
          </Button>
        </form>
      </Modal>
    );
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="board">
        <Header board={board} />
        <div className="content">
          {board.columns.length < 1 ? (
            <div className="empty">
              <p>This board is empty. Create a new column to get started.</p>
              <button className="button primary" onClick={() => setNewColumnModalOpen(true)}>
                + Add New Column
              </button>
            </div>
          ) : (
            <>
              {renderColumns()}
              <div key={board.columns.length} className="column new">
                + New Column
              </div>
            </>
          )}

          {modalOpen && (
            <Modal>
              <h3>Delete this task?</h3>
              <p>
                Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This
                action cannot be reversed.
              </p>
              <div className="buttons">
                <Button color="destructive" variant="large" fullWidth>
                  Delete
                </Button>
                <Button color="secondary" fullWidth onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </Modal>
          )}

          {newColunModalOpen && <NewColumnModal />}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
