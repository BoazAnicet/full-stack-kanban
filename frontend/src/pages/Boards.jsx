import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Board from "../components/Board";
import Button from "../components/Button";
import Header from "../components/Header";
import Modal from "../components/Modal";
import SideBar from "../components/SideBar";
import Select from "../components/Select";
import { createBoard, fetchAllBoards } from "../features/boards/boardsSlice";
import { v4 as uuid4 } from "uuid";
import { toast } from "react-toastify";
import { fetchAllTemplates } from "../features/boardTemplates/boardTemplatesSlice";

const Boards = () => {
  const [title, setTitle] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { boards, isSuccess } = useSelector((state) => state.boards);
  const { boardTemplates } = useSelector((state) => state.boardTemplates);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newBoardModalOpen, setNewBoardModalOpen] = useState(false);
  const [newBoardOptions, setNewBoardOptions] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState({ value: "none", label: "None" });

  const [newBoard] = useState({
    tasks: [],
    columns: [
      { name: "Todo", id: uuid4(), taskIds: [] },
      { name: "Doing", id: uuid4(), taskIds: [] },
      { name: "Done", id: uuid4(), taskIds: [] },
    ],
    columnOrder: ["Todo", "Doing", "Done"],
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchAllBoards());
    dispatch(fetchAllTemplates());
  }, []);

  useEffect(() => {
    const t = boardTemplates.map((t) => {
      return { value: `${t.name}`.toLowerCase(), label: `${t.name}` };
    });

    setNewBoardOptions([{ value: "none", label: "None" }, ...t]);
  }, [boardTemplates]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.length <= 0) {
      return toast.error("Title must not be empty");
    }

    if (selectedTemplate.value === "none") {
      dispatch(createBoard({ ...newBoard, title, columnOrder: newBoard.columns.map((c) => c.id) }));
    } else {
      const template = boardTemplates.map(({ createdAt, updatedAt, _id, ...rest }) => rest)[0];
      dispatch(createBoard({ title, ...template }));
    }

    if (isSuccess) {
      setNewBoardModalOpen(false);
      setTitle("");
    }
  };

  return (
    <div id="boards">
      <Header />
      <div style={{ width: "100%", display: "flex" }}>
        <SideBar boards={boards} setNewBoardModalOpen={setNewBoardModalOpen} />

        {boards ? <Board /> : ""}

        {newBoardModalOpen && (
          <Modal closeModal={() => setNewBoardModalOpen(false)}>
            <h3>Add New Board</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name" className="input label">
                Name
                <div className="input container">
                  <input
                    name="name"
                    className="input field"
                    placeholder="e.g. Web Design"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
              </label>
              <br />
              <br />
              <div>Select a template</div>
              <Select
                defaultValue={{ value: "none", label: "None" }}
                value={selectedTemplate}
                options={newBoardOptions}
                onChange={(selectedValue) => setSelectedTemplate(selectedValue)}
              />
              <br />
              <br />
              <Button color="primary" variant="large" fullWidth>
                Create New Board
              </Button>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Boards;
