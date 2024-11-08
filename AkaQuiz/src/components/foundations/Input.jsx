import PropTypes from 'prop-types';

const Input = ({ type = 'text', placeholder = '', value, onChange, disabled = false }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full px-4 py-2 border rounded-lg shadow-inner border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:opacity-50"
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Input;
