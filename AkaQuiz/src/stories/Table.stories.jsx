import Table from '../components/foundations/Table';

// Default export to define metadata for the story
export default {
  title: 'Design System/Foundations/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    headers: { control: 'array' },
    rows: { control: 'array' },
  },
};

const Template = (args) => <Table {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  headers: ['Username', 'Score'],
  rows: [
    ['John Doe', 150],
    ['Jane Doe', 145],
    ['Player 3', 120],
  ],
};

export const WithDifferentData = Template.bind({});
WithDifferentData.args = {
  headers: ['Name', 'Points', 'Rank'],
  rows: [
    ['Alice', 200, '1st'],
    ['Bob', 180, '2nd'],
    ['Charlie', 160, '3rd'],
  ],
};
