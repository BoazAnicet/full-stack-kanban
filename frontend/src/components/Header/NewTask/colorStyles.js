const colorStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused ? "#635fc7" : "#828fa340",
    "&:hover": {
      borderColor: "#635fc7",
      cursor: "pointer",
    },
    "&:active": {
      borderColor: "#635fc7",
      outline: "#635fc7",
    },
    "&:focus": {
      borderColor: "#635fc7",
      outline: "#635fc7",
    },
    color: "#FFFFFF",
    backgroundColor: "transparent",
  }),
  // Arrow
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    color: "#635fc7",
  }),
  menuList: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "#2b2c37",
    color: "#FFF",
    borderRadius: "10px",
  }),
  // Single option in list
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "#2b2c37",
    color: "#FFF",
    "&:hover": {
      cursor: "pointer",
      color: "#635fc7",
    },
  }),
  // Initial text ex. "Select..."
  placeholder: (baseStyles, state) => ({
    ...baseStyles,
    color: "#FFF",
  }),
  // Selected value
  singleValue: (baseStyles, state) => ({
    ...baseStyles,
    color: "#FFF",
    fontSize: "16px",
  }),
  menu: (baseStyles, state) => ({
    ...baseStyles,
    borderRadius: "999px",
  }),
};

export default colorStyles;
