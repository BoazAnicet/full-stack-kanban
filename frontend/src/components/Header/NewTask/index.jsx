import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBoard } from "../../../features/boards/boardsSlice";
import Button from "../../Button";
import Modal from "../../Modal";
import Select from "../../Select";
import IconCross from "../../../assets/IconCross";
import { replaceAt } from "../../../utils";

// const replaceAt = (array, index, value) => {
//   const ret = array.slice(0);
//   ret[index] = value;
//   return ret;
// };

const NewTask = ({ setNewTaskModalOpen }) => {
  const dispatch = useDispatch();
  const { board } = useSelector((state) => state.boards);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "todo",
    subtasks: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBoard = {
      ...board,
      tasks: [
        ...board.tasks,
        {
          ...newTask,
          status: newTask.status.value,
          id:
            newTask.title.split(" ").join("-").toLowerCase() +
            "-" +
            Math.floor(Math.random() * 99999),
        },
      ],
    };
    dispatch(editBoard(updatedBoard));
    setNewTaskModalOpen(false);
  };

  const addNewSubtask = (e) => {
    e.preventDefault();
    const arr = [...newTask.subtasks];
    arr.push({ title: "", isCompleted: false });
    console.log(arr);
    setNewTask({ ...newTask, subtasks: arr });
  };

  const removeNewSubtask = (e, index) => {
    e.preventDefault();
    console.log("clicked");
    const arr = [...newTask.subtasks];
    console.log("copy of new subtasks", arr);
    arr.splice(index, 1);
    console.log("arr after splicing", arr);
    setNewTask({ ...newTask, subtasks: arr });
  };

  // const renderNewSubtasks = () => {
  //   return newTask.subtasks.map((st, i) => (
  //     <div className="input container" key={i}>
  //       <input
  //         className="input field"
  //         // name="description"
  //         // placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
  //         // rows={4}
  //         value={st.title}
  //         // onChange={(e) => setNewTask({ ...newTask, subtasks[0]:"sd" })}
  //         onChange={() => {}}
  //       />
  //       <button onClick={(e) => removeNewSubtask(e, i)}>X</button>
  //     </div>
  //   ));
  // };
  const renderNewSubtasks = () => {
    return newTask.subtasks.map((st, i) => (
      <div className="input container" key={i}>
        <input
          className="input field"
          // name="description"
          // placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          // rows={4}
          value={st.title}
          // onChange={(e) => setNewTask({ ...newTask, subtasks[0]:"sd" })}
          onChange={() => {}}
        />
        <button className="delete" onClick={(e) => removeNewSubtask(e, i)}>
          <IconCross />
        </button>
      </div>
    ));
  };

  return (
    <Modal closeModal={() => setNewTaskModalOpen(false)}>
      <h3>Add new task</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className="input label">
          Title:
          <div className="input container">
            <input
              className="input field"
              value={newTask.title}
              name="title"
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="e.g. Take a coffee break"
            />
          </div>
        </label>
        <br />
        <label className="input label">
          Description:
          <div className="input container">
            <textarea
              className="input field"
              name="description"
              placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
              rows={4}
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
          </div>
        </label>
        <br />

        <div style={{ fontWeight: "bold" }}>Subtasks:</div>

        {renderNewSubtasks()}

        <br />
        <Button color="secondary" fullWidth onClick={addNewSubtask}>
          + Add New Subtask
        </Button>

        <label className="input label">
          <div style={{ marginBottom: "8px" }}>Status:</div>

          <Select
            defaultValue={"todo"}
            // defaultValue={value}
            value={newTask.status}
            onChange={(selectedValue) => setNewTask({ ...newTask, status: selectedValue })}
          />
        </label>

        <br />
        <br />

        <Button color={"primary"} variant={"large"} type="submit" fullWidth>
          Create Task
        </Button>
      </form>
    </Modal>
  );
};

export default NewTask;
