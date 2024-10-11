import PropTypes from 'prop-types';

const Card = ({ children, backgroundColor = 'bg-gray-50', ...props }) => {
  return (
    <div className={`w-full h-full overflow-hidden shadow-2xl ${backgroundColor} rounded-xl`} {...props}>
      <div className="flex flex-col items-center justify-between h-full p-10 text-center">
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
};

export default Card;
