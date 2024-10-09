import Button from '../components/foundations/Button';

// Default export to define metadata for the story
export default {
  title: 'Design System/Foundations/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    onClick: { action: 'clicked' },
    variant: {
      control: {
        type: 'select',
        options: ['primary', 'secondary'],
      },
    },
    className: {
      control: 'text',
    },
  },
};

export const Primary = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
  },
};

export const CustomStyledButton = {
  args: {
    label: 'Custom Styled Button',
    variant: 'primary',
    className: 'bg-gradient-to-r from-green-400 to-blue-500',
  },
};
