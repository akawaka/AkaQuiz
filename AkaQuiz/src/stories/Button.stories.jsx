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
        options: ['primary', 'secondary', 'soft', 'labelIcon', 'icon'],
      },
    },
    className: {
      control: 'text',
    },
    icon: {
      control: 'text',
    },
    children: {
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

export const Soft = {
  args: {
    label: 'Soft Button',
    variant: 'soft',
  },
};

export const LabelIcon = {
  args: {
    label: 'Label Icon Button',
    variant: 'labelIcon',
    icon: '🔍',
  },
};

export const Icon = {
  args: {
    variant: 'icon',
    children: '🔍',
  },
};

export const CustomStyledButton = {
  args: {
    label: 'Custom Styled Button',
    variant: 'primary',
    className: 'bg-gradient-to-r from-green-400 to-blue-500',
  },
};
