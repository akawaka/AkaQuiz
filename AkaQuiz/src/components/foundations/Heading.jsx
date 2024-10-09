// src/components/typography/Heading.jsx
import PropTypes from 'prop-types';

export const Heading = ({ level, children, ...props }) => {
  const Tag = `h${level}`;
  const styles = {
    1: 'text-5xl font-extrabold',
    2: 'text-4xl font-bold',
    default: 'text-2xl font-semibold'
  };
  const headingStyle = styles[level] || styles.default;

  return (
    <Tag className={`${headingStyle} text-gray-800`} {...props}>
      {children}
    </Tag>
  );
};

Heading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: PropTypes.node.isRequired,
};

export default Heading;