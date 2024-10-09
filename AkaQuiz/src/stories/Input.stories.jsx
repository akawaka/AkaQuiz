import Input from '../components/foundations/Input';

export default {
  title: 'Design System/Foundations/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: "centered",
  },
  args: {
    type: 'text',
    placeholder: 'Enter text',
    value: '',
    disabled: false,
  },
  argTypes: {
    type: {
      control: { type: 'select', options: ['text', 'email', 'password', 'number'] },
    },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export const Default = (args) => <Input {...args} />;
