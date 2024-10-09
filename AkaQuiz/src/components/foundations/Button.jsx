import PropTypes from 'prop-types';

export const Button = ({ label, onClick, className, variant = 'primary', icon, children, ...props }) => {
  const baseStyle = 'rounded focus:outline-none focus:ring-2 transition ease-out duration-300';
  const variantStyle = variant === 'primary'
    ? 'bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-600'
    : variant === 'secondary'
      ? 'bg-white text-indigo-500 border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 focus:ring-indigo-600'
      : 'text-gray-400 hover:text-gray-500 rounded-full';
  const paddingStyle = variant === 'icon' ? 'p-2' : 'py-2 px-4';

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${paddingStyle} ${className} flex items-center justify-center`}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {variant === 'icon' ? children : label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'icon']),
  icon: PropTypes.node,
  children: PropTypes.node,
};

export default Button;
