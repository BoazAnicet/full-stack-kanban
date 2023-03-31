const PopupMenu = ({ children, props }) => {
  return (
    <div {...props} className="popup-menu" onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};
export default PopupMenu;
