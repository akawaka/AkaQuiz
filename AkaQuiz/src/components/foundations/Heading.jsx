// src/components/typography/Heading.jsx
import PropTypes from 'prop-types';

export const Heading = ({ level, children, white = false, ...props }) => {
  const Tag = `h${level}`;
  const styles = {
    1: 'text-5xl font-extrabold tracking-tight',
    2: 'text-4xl font-bold tracking-tight',
    3: 'text-2xl font-bold',
    default: 'text-xl font-semibold'
  };
  const headingStyle = styles[level] || styles.default;
  const textColor = white ? 'text-white' : 'text-slate-800';

  return (
    <Tag className={`${headingStyle} ${textColor}`} {...props}>
      {children}
    </Tag>
  );
};

Heading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: PropTypes.node.isRequired,
  white: PropTypes.bool,
};

export default Heading;
