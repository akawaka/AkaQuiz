import Card from '../components/foundations/Card';

// Default export to define metadata for the story
export default {
  title: "Design System/Foundations/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: 'text' },
    justifyContent: {
      control: { type: 'select' },
      options: ['justify-between', 'justify-center'],
    },
    alignContent: {
      control: { type: 'select' },
      options: ['items-center', 'items-start'],
    },
    children: { control: "text" },
  },
};

// Default story
export const Default = {
  args: {
    backgroundColor: 'bg-slate-50',
    justifyContent: 'justify-between',
    alignContent: 'items-center',
    children: (
      <>
        <h2 className="text-xl font-bold">Sample Card</h2>
        <p className="mt-2 text-slate-600">
          This is a simple card component. Use it to wrap content with padding, shadow, and rounded corners.
        </p>
      </>
    ),
  },
};

// Example with different content and styling
export const CustomStyling = {
  args: {
    backgroundColor: 'bg-blue-100',
    justifyContent: 'justify-center',
    alignContent: 'items-start',
    children: (
      <>
        <h2 className="text-xl font-bold">Custom Card Content</h2>
        <p className="mt-2 text-slate-600">
          This card demonstrates custom background color and content alignment.
        </p>
        <ul className="mt-4 list-disc list-inside">
          <li>Custom background color</li>
          <li>Centered content vertically</li>
          <li>Left-aligned content</li>
        </ul>
      </>
    ),
  },
};
