import PropTypes from 'prop-types';

const BadgeVariants = {
  withBorder: {
    className: 'inline-flex uppercase items-center rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-600 ring-1 ring-inset ring-red-500/10',
  },
};

export const Badge = ({ variant, children, className, ...props }) => {
  const { className: variantClassName } = BadgeVariants[variant];

  return (
    <span
      className={`${variantClassName} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['withBorder']),
};

export default Badge;
