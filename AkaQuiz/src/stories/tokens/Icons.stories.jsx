import PropTypes from 'prop-types';
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";

export default {
  title: 'Design System/Tokens/Icons',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
    },
  },
};

const icons = {
  ArrowLeftIcon: <ArrowLeftIcon className="w-8 h-8" />,
  ArrowPathIcon: <ArrowPathIcon className="w-8 h-8" />,
  ExclamationTriangleIcon: <ExclamationTriangleIcon className="w-8 h-8" />,
  XMarkIcon: <XMarkIcon className="w-8 h-8" />,
  CheckCircleIcon: <CheckCircleIcon className="w-8 h-8" />,
};

const IconTemplate = ({ icon, name }) => (
  <div className="p-5 m-2 space-y-4 border shadow-md border-slate-300">
    <div>{icon}</div>
    <p>{name}</p>
  </div>
);

IconTemplate.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};

export const AllIcons = {
  render: () => (
    <div className="flex flex-wrap">
      {Object.keys(icons).map((iconKey) => (
        <IconTemplate key={iconKey} icon={icons[iconKey]} name={iconKey} />
      ))}
    </div>
  ),
};
