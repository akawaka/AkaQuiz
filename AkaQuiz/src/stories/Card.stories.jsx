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
    children: { control: "text" },
  },
};

// Default story
export const Default = {
  args: {
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

// Example with different content
export const WithCustomContent = {
  args: {
    children: (
      <>
        <h2 className="text-xl font-bold">Custom Card Content</h2>
        <p className="mt-2 text-slate-600">
          You can add different types of content to the card like lists, images, or anything else.
        </p>
      </>
    ),
  },
};
