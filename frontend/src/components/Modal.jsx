import { createPortal } from "react-dom";

const Modal = ({ children, closeModal }) => {
  return createPortal(
    <div className="modal" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
