import PropTypes from 'prop-types';

export default {
  title: 'Design System/Tokens/Shadows',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    shadow: {
      control: 'text',
    },
  },
};

const shadows = {
  none: 'shadow-none',
  medium: 'shadow-md',
  large: 'shadow-2xl',
};

const ShadowTemplate = ({ shadow, name }) => (
  <div className={`p-5 m-2 ${shadow} border border-slate-300`}>
    <p>{name}: {shadow}</p>
  </div>
);

ShadowTemplate.propTypes = {
  shadow: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export const AllShadows = {
  render: () => (
    <div>
      {Object.keys(shadows).map((shadowKey) => (
        <ShadowTemplate key={shadowKey} shadow={shadows[shadowKey]} name={shadowKey} />
      ))}
    </div>
  ),
};
