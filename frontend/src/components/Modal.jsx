import { createPortal } from "react-dom";

const Modal = ({ children, closeModal, ...props }) => {
  return createPortal(
    <div className="modal" onClick={closeModal} {...props}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={props.contentstyle}
      >
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
