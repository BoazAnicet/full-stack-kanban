import PropTypes from "prop-types";

const Button = ({ variant, color, children, fullWidth, ...props }) => {
  return (
    <button
      className={["button", color, variant, `${fullWidth && "full-width"}`].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["large", "small"]).isRequired,
  color: PropTypes.oneOf(["primary", "secondary", "destructive", "transparent"]).isRequired,
};

Button.defaultProps = {
  variant: "large",
};

export default Button;
