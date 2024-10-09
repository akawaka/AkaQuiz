import BentoGrid from '../components/foundations/Grid';

export default {
  title: 'Components/BentoGrid',
  component: BentoGrid,
  tags: ['autodocs'],  // For automatic documentation generation
  args: {
    columns: 3,
    gap: '1rem',
    rowGap: '1rem',
  },
  argTypes: {
    columns: {
      control: { type: 'number' },
      description: 'Number of columns in the grid',
    },
    gap: {
      control: { type: 'text' },
      description: 'Gap between grid items (both rows and columns)',
    },
    rowGap: {
      control: { type: 'text' },
      description: 'Gap between grid rows',
    },
  },
};

// Template for the story
export const Default = (args) => (
  <BentoGrid {...args}>
    <div className="p-4 bg-red-200">Item 1</div>
    <div className="p-4 bg-green-200">Item 2</div>
    <div className="p-4 bg-blue-200">Item 3</div>
    <div className="p-4 bg-yellow-200">Item 4</div>
    <div className="p-4 bg-purple-200">Item 5</div>
    <div className="p-4 bg-pink-200">Item 6</div>
  </BentoGrid>
);
