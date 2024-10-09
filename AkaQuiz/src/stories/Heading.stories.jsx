// src/components/typography/Heading.stories.jsx
import Heading from '../components/foundations/Heading';

export default {
  title: 'Design System/Foundations/Typography/Heading',
  component: Heading,
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
    className: {
      control: 'text',
    },
  },
};

const Template = (args) => <Heading {...args} />;

export const Default = Template.bind({});
Default.args = {
  level: 2,
  children: 'This is an H2 Heading',
};

export const H1Heading = Template.bind({});
H1Heading.args = {
  level: 1,
  children: 'This is an H1 Heading',
};

export const H3Heading = Template.bind({});
H3Heading.args = {
  level: 3,
  children: 'This is an H3 Heading',
};

export const CustomStyledHeading = Template.bind({});
CustomStyledHeading.args = {
  level: 2,
  children: 'This is a custom styled H2 Heading',
  className: 'text-red-500', // Apply any custom styles here
};
