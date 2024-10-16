import PropTypes from 'prop-types';

export default {
  title: 'Design System/Tokens/Colors',
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'color',
    },
  },
};

const redColors = {
  "red-50": 'bg-red-50',
  "red-500": 'bg-red-500',
  "red-600": 'bg-red-600',
};

const indigoColors = {
  "indigo-50": 'bg-indigo-50',
  "indigo-500": 'bg-indigo-500',
  "indigo-600": 'bg-indigo-600',
};

const slateColors = {
  "slate-50": 'bg-slate-50',
  "slate-100": 'bg-slate-100',
  "slate-300": 'bg-slate-300',
  "slate-400": 'bg-slate-400',
  "slate-500": 'bg-slate-500',
  "slate-600": 'bg-slate-600',
  "slate-700": 'bg-slate-700',
  "slate-800": 'bg-slate-800',
  "slate-900": 'bg-slate-900',
  "slate-950": 'bg-slate-950',
};

const ColorTemplate = ({ color, name }) => (
  <div className="p-5 m-2 space-y-2 border border-gray-300 shadow-md">
    <div className={`w-24 h-24 ${color}`}></div>
    <p>{name}</p>
  </div>
);

ColorTemplate.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export const AllColors = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        {Object.keys(redColors).map((colorKey) => (
          <ColorTemplate key={colorKey} color={redColors[colorKey]} name={colorKey} />
        ))}
      </div>
      <div className="flex items-center space-x-4">
      {Object.keys(indigoColors).map((colorKey) => (
        <ColorTemplate key={colorKey} color={indigoColors[colorKey]} name={colorKey} />
      ))}
    </div>
    <div className="flex items-center space-x-4">
      {Object.keys(slateColors).map((colorKey) => (
        <ColorTemplate key={colorKey} color={slateColors[colorKey]} name={colorKey} />
      ))}
    </div>
    </div>
  ),
};

