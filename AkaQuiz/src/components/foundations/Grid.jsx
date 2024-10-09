import PropTypes from 'prop-types';

export const Grid = ({
  children,
  columns = 4,
  gap = '1rem',
  className,
  ...props
}) => {
  return (
    <div
      className={`grid grid-cols-${columns} gap-${gap} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.number,
  gap: PropTypes.string,
  className: PropTypes.string,
};

export default Grid;
