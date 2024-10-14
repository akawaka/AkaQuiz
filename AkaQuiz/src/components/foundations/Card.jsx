import PropTypes from 'prop-types';

const Card = ({ children, backgroundColor = 'bg-slate-50', justifyContent = 'justify-between', alignContent = 'items-center', ...props }) => {
  return (
    <div className={`w-full h-full overflow-hidden shadow-2xl ${backgroundColor} rounded-3xl`} {...props}>
      <div className={`flex flex-col ${alignContent} ${justifyContent} h-full p-10`}>
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  justifyContent: PropTypes.oneOf(['justify-between', 'justify-center']),
  alignContent: PropTypes.oneOf(['items-center', 'items-start'])
};

export default Card;
