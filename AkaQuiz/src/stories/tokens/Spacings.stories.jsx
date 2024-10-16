import PropTypes from 'prop-types';

export default {
  title: 'Design System/Tokens/Spacings',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    spacing: {
      control: 'text',
    },
  },
};

const spacings = {
  'p-0': 'p-0',
  'p-1': 'p-1',
  'p-2': 'p-2',
  'p-4': 'p-4',
  'p-8': 'p-8',
  'p-10': 'p-10',
  'p-16': 'p-16',
};

const SpacingTemplate = ({ spacing, name }) => (
  <div className={`${spacing} border border-slate-300 shadow-md `}>
    <div className="">{name}</div>
  </div>
);

SpacingTemplate.propTypes = {
  spacing: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export const AllSpacings = {
  render: () => (
    <div className="space-y-8">
      {Object.keys(spacings).map((spacingKey) => (
        <SpacingTemplate key={spacingKey} spacing={spacings[spacingKey]} name={spacingKey} />
      ))}
    </div>
  ),
};
