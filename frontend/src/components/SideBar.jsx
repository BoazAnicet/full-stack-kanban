import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logoLight from "../assets/logo-light.svg";
import boardIcon from "../assets/icon-board.svg";
import IconBoard from "../assets/IconBoard";

const SideBar = ({ boards, setNewBoardModalOpen }) => {
  const { board } = useSelector((state) => state.boards);

  const renderBoards = () => {
    return boards.map((b) => (
      <li key={b._id}>
        <Link
          role="button"
          className={`link ${b._id === board?._id ? "active" : ""}`}
          to={`/boards/${b._id}`}
        >
          <IconBoard /> {b.title}
        </Link>
      </li>
    ));
  };

  return (
    <aside className="sidebar">
      {/* <div className="logo">KANBAN</div> */}
      <div className="logo-container">
        <img src={logoLight} alt="Kanban" />
      </div>
      <div className="num-of-boards">All boards {`(${boards.length})`}</div>
      <div className="boards">
        <ul>
          {renderBoards()}
          <li onClick={() => setNewBoardModalOpen(true)}>
            <div className="link">+ Create New Board</div>
          </li>
        </ul>
        {/* <ul className="boards-list">{renderBoards()}</ul> */}
      </div>
    </aside>
  );
};

export default SideBar;
