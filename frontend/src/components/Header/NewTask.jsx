"use strict";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBoard } from "../../features/boards/boardsSlice";
import Button from "../Button";
import Modal from "../Modal";
import Select from "../Select";
import IconCross from "../../assets/IconCross";
import { replaceAt } from "../../utils";
import { v4 as uuid4 } from "uuid";

import axios from "axios";
const API_URL = "https://api.giphy.com/v1/gifs/trending?api_key=6jDT6m372Fsytxem8D3p3mCcncfTfO30";

const NewTask = ({ setNewTaskModalOpen }) => {
  const dispatch = useDispatch();
  const { board } = useSelector((state) => state.boards);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "todo",
    subtasks: [],
    id: uuid4(),
  });

  const [options, setOptions] = useState([]);

  const [gifsOpen, setGifsOpen] = useState(false);
  const [gifs, setGifs] = useState([]);
  const [gif, setGif] = useState("");

  useEffect(() => {
    let o = board.columns.map((c) => {
      return {
        value: `${c.name}`.toLowerCase(),
        label: `${c.name}`,
      };
    });

    setOptions(o);
    fetchGifs();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let col = {
      ...board.columns.filter((c) => c.name === newTask.status.label)[0],
      taskIds: [
        ...board.columns.filter((c) => c.name === newTask.status.label)[0].taskIds,
        newTask.id,
      ],
    };

    const updatedBoard = {
      ...board,
      columns: [...board.columns.filter((c) => c.name !== newTask.status.label), col],
      tasks: [
        ...board.tasks,
        {
          ...newTask,
          img: gif,
          status: newTask.status,
        },
      ],
    };
    // console.log(updatedBoard);

    dispatch(editBoard(updatedBoard));
    setNewTaskModalOpen(false);
  };

  const addNewSubtask = (e) => {
    e.preventDefault();
    const arr = [...newTask.subtasks];
    arr.push({ title: "", isCompleted: false });
    setNewTask({ ...newTask, subtasks: arr });
  };

  const removeNewSubtask = (e, index) => {
    e.preventDefault();
    const arr = [...newTask.subtasks];
    arr.splice(index, 1);
    setNewTask({ ...newTask, subtasks: arr });
  };

  const renderNewSubtasks = () => {
    return newTask.subtasks.map((st, i) => (
      <div className="input container" key={i}>
        <input
          className="input field"
          value={st.title}
          onChange={(e) => {
            setNewTask({
              ...newTask,
              subtasks: replaceAt(newTask.subtasks, i, {
                ...newTask.subtasks[i],
                title: e.target.value,
              }),
            });
          }}
        />
        <button className="delete" onClick={(e) => removeNewSubtask(e, i)}>
          <IconCross />
        </button>
      </div>
    ));
  };

  const fetchGifs = async () => {
    const response = await axios.get(API_URL).then((res) => res.data.data);
    setGifs(response);
    // console.log(response);
  };

  const renderGifs = () => {
    return gifs.map((g) => (
      <div
        key={g.id}
        style={{ display: "inline" }}
        onClick={() => {
          setGif(g.images.original.url);
          setGifsOpen(false);
        }}
      >
        <img src={g.images.original.url} height={140} />
      </div>
    ));
  };

  return (
    <>
      <Modal closeModal={() => setNewTaskModalOpen(false)}>
        <h3>Add new task</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title" className="input label">
            Title
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
            Description
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
          {gif && <img src={gif} width="100%" />}
          <br />
          <br />
          <Button
            color="secondary"
            fullWidth
            onClick={() => {
              setGifsOpen(true);
            }}
            type="button"
          >
            Add Gif
          </Button>

          <br />

          <div style={{ fontWeight: "bold" }}>Subtasks</div>

          {renderNewSubtasks()}

          <br />
          <Button color="secondary" fullWidth onClick={addNewSubtask}>
            + Add New Subtask
          </Button>

          <br />
          <br />

          <label className="input label">
            <div style={{ marginBottom: "8px" }}>Status</div>

            <Select
              // defaultValue={{ value: "todo", label: "Todo" }}
              value={newTask.status}
              options={options}
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
      {gifsOpen && (
        <Modal
          closeModal={() => setGifsOpen(false)}
          contentstyle={{
            height: "90vh",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            overflowY: "scroll",
          }}
        >
          <div>{renderGifs()}</div>
        </Modal>
      )}
    </>
  );
};

export default NewTask;
