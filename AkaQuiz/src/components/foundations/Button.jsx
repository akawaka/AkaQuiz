import PropTypes from 'prop-types';

const ButtonVariants = {
  primary: {
    className: 'bg-red-500 font-medium text-lg tracking-tight text-white hover:bg-red-600 focus:ring-red-600 py-2 px-4',
    content: ({ label }) => (
      <>
        {label}
      </>
    ),
  },
  secondary: {
    className: 'bg-indigo-500 font-medium text-lg tracking-tight text-white hover:bg-indigo-600 focus:ring-indigo-600 py-2 px-4',
    content: ({ label }) => (
      <>
        {label}
      </>
    ),
  },
  soft: {
    className: 'bg-white font-medium text-lg tracking-tight text-red-500 border border-slate-200 hover:border-red-600 hover:text-red-600 focus:ring-red-600 py-2 px-4',
    content: ({ label }) => (
      <>
        {label}
      </>
    ),
  },
  labelIcon: {
    className: 'text-slate-400 hover:text-slate-500 rounded-full p-2  focus:ring-slate-600 focus:text-slate-700',
    content: ({ label, icon }) => (
      <>
        <div className="mr-2">{icon}</div>
        {label}
      </>
    ),
  },
  icon: {
    className: 'text-slate-400 hover:text-slate-500 rounded-full p-2',
    content: ({ children }) => children,
  },
};

export const Button = ({ variant = 'primary', onClick, className, icon, label, children, ...props }) => {
  const { className: variantClassName, content } = ButtonVariants[variant];
  const baseStyle = 'rounded focus:outline-none focus:ring-2 transition ease-out duration-300';

  return (
    <button
      className={`${baseStyle} ${variantClassName} ${className} flex items-center justify-center`}
      onClick={onClick}
      {...props}
    >
      {content({ label, icon, children })}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'icon', 'soft', 'labelIcon']),
  icon: PropTypes.node,
  children: PropTypes.node,
};

export default Button;
