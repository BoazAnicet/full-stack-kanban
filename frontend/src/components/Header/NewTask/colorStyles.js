const colorStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: "#a8a4ff",
    color: "#FFFFFF",
    backgroundColor: "transparent",
  }),
  // Single option in list
  // option: (baseStyles, state) => ({
  //   ...baseStyles,
  //   backgroundColor: "#2b2c37",
  //   color: "#FFF",
  // }),
  // Arrow
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    color: "#635fc7",
  }),
  menuList: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "#2b2c37",
    color: "#FFF",
  }),
  // Initial text ex. "Select..."
  placeholder: (baseStyles, state) => ({
    ...baseStyles,
    // backgroundColor: "#2b2c37",
    color: "#FFF",
  }),
  // Selected value
  singleValue: (baseStyles, state) => ({
    ...baseStyles,
    color: "#FFF",
  }),
};

export default colorStyles;
