import PropTypes from 'prop-types';

const Card = ({ children, ...props }) => {

  return (
    <div className="w-full h-full overflow-hidden shadow-2xl bg-gray-50 rounded-xl" {...props}>
      <div className="flex flex-col justify-between h-full p-10">
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
