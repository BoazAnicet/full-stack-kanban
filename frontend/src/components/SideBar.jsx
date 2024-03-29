import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset as authReset } from "../features/auth/authSlice";
import { reset as boardsReset } from "../features/boards/boardsSlice";
import Button from "./Button";
import { useEffect, useState } from "react";
import { IconHideSidebar, IconShowSidebar, IconBoard } from "../assets/Icons";
import { useWindowSize } from "@uidotdev/usehooks";

const SideBar = ({ boards, setNewBoardModalOpen, setMobileMenuOpen }) => {
  const { board } = useSelector((state) => state.boards);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [barHidden, setBarHidden] = useState(false);
  const size = useWindowSize();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(authReset());
    dispatch(boardsReset());
    navigate("/");
  };

  useEffect(() => {
    if (size.width < 500) {
      setBarHidden(false);
    }
  }, [size.width]);

  const renderBoards = () => {
    return boards.map((b) => (
      <li key={b._id} onClick={size.width < 500 ? () => setMobileMenuOpen(false) : () => {}}>
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
    <aside
      className="sidebar"
      style={{ width: barHidden ? 0 : "300px", minWidth: barHidden ? 0 : "300px" }}
    >
      {!barHidden && (
        <>
          <div className="num-of-boards">All boards {`(${boards.length})`}</div>
          <div className="boards">
            <ul>
              {renderBoards()}
              <li onClick={() => setNewBoardModalOpen(true)}>
                <div className="link main-purple">
                  <IconBoard /> + Create New Board
                </div>
              </li>
            </ul>
            <div>
              {user && (
                <div className="username">
                  <div>{user.name}</div>
                  <br />
                  <Button color="primary" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              )}
              {!barHidden && size.width > 500 && (
                <Button color="transparent" onClick={() => setBarHidden(true)}>
                  <IconHideSidebar /> Hide Sidebar
                </Button>
              )}
            </div>
          </div>
        </>
      )}
      {barHidden && size.width > 500 && (
        <div className="show" onClick={() => setBarHidden(false)}>
          <IconShowSidebar />
        </div>
      )}
    </aside>
  );
};

export default SideBar;
