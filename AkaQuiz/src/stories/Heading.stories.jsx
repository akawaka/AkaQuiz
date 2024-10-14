import { Heading } from '../components/foundations/Heading';

export default {
  title: 'Design System/Foundations/Typography/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: {
        type: 'select',
        options: [1, 2, 3, 4, 5, 6],
      },
    },
    children: {
      control: 'text',
    },
    white: {
      control: 'boolean',
    },
  },
};

export const H1 = {
  args: {
    level: 1,
    children: 'This is an H1 Heading',
  },
};

export const H2 = {
  args: {
    level: 2,
    children: 'This is an H2 Heading',
  },
};

export const H3 = {
  args: {
    level: 3,
    children: 'This is an H3 Heading',
  },
};

export const WhiteHeading = {
  args: {
    level: 2,
    children: 'This is a white H2 Heading',
    white: true,
  },
};

export const CustomStyledHeading = {
  args: {
    level: 2,
    children: 'This is a custom styled H2 Heading',
    className: 'text-red-500',
  },
};
