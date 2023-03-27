import { Link } from "react-router-dom";
import logoLight from "../assets/logo-light.svg";

const SideBar = ({ boards, setNewBoardModalOpen }) => {
  const renderBoards = () => {
    return boards.map((b) => (
      <li key={b._id}>
        <Link role="button" className="link" to={`/boards/${b._id}`}>
          {b.title}
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
      {/* <div>All boards {`(${boards.length})`}</div> */}
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
