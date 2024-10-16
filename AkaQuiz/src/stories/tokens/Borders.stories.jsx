import PropTypes from 'prop-types';

export default {
  title: 'Design System/Tokens/Borders',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    border: {
      control: 'text',
    },
  },
};

const borders = {
  none: 'border-none',
  thin: 'border border-slate-300',
  medium: 'border-2 border-slate-400',
};

const BorderTemplate = ({ border, name }) => (
  <div className={`p-5 m-2 ${border} shadow-md`}>
    <p>{name}: {border}</p>
  </div>
);

BorderTemplate.propTypes = {
  border: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export const AllBorders = {
  render: () => (
    <div>
      {Object.keys(borders).map((borderKey) => (
        <BorderTemplate key={borderKey} border={borders[borderKey]} name={borderKey} />
      ))}
    </div>
  ),
};
