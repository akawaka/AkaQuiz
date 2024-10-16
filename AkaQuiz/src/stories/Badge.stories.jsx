import Badge from '../components/foundations/Badge';

export default {
  title: 'Design System/Foundations/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
    variant: {
      control: {
        type: 'select',
        options: ['withBorder'],
      },
    },
    className: {
      control: 'text',
    },
  },
};

export const WithBorder = {
  args: {
    children: 'Badge Text',
    variant: 'withBorder',
  },
};
