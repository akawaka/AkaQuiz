import Button from '../components/foundations/Button';
import { XMarkIcon, ArrowPathIcon } from "@heroicons/react/20/solid";

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
    icon: <ArrowPathIcon className="w-5 h-5" />,
  },
};

export const Icon = {
  args: {
    variant: 'icon',
    children: <XMarkIcon className="w-5 h-5" />,
  },
};
