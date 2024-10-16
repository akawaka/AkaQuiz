import PropTypes from 'prop-types';

export default {
  title: 'Design System/Tokens/Grids',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    grid: {
      control: 'text',
    },
  },
};

const gridClass = 'grid grid-cols-7 gap-4';

const GridTemplate = () => (
  <div className={`${gridClass} p-12 border border-slate-300`}>
    <div className="col-span-5 p-12 bg-slate-200">1</div>
    <div className="col-span-2 p-12 bg-slate-300">2</div>
    <div className="col-span-3 row-span-2 p-12 bg-slate-400">3</div>
    <div className="col-span-4 p-12 bg-slate-500">4</div>
    <div className="col-span-4 p-12 bg-slate-600">5</div>
  </div>
);

GridTemplate.propTypes = {
  grid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export const BentoGrid = {
  render: () => (
    <div>
      <GridTemplate grid={gridClass} name="7-columns" />
    </div>
  ),
};
