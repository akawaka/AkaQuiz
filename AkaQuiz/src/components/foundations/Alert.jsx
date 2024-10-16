import PropTypes from "prop-types";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";

export const Alert = ({
  type,
  title,
  description,
  listItems,
  dismissible,
  onDismiss,
  actions,
  autoDismissTime,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setIsVisible(true);
    if (autoDismissTime) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress <= 0) {
            clearInterval(interval);
            setIsVisible(false);
            if (onDismiss) onDismiss();
            return 0;
          }
          return prevProgress - (100 / (autoDismissTime / 100));
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [autoDismissTime, onDismiss]);

  const alertStyles = {
    success: "bg-green-50 text-green-700 border-green-300",
    error: "bg-red-50 text-red-700 border-red-300",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-300",
    info: "bg-blue-50 text-indigo-700 border-indigo-300",
  };

  const iconStyles = {
    success: "text-green-400",
    error: "text-red-400",
    warning: "text-yellow-400",
    info: "text-blue-400",
  };

  const progressBarStyles = {
    success: "bg-green-400",
    error: "bg-red-400",
    warning: "bg-yellow-400",
    info: "bg-blue-400",
  };

  const icons = {
    success: ExclamationTriangleIcon,
    error: ExclamationTriangleIcon,
    warning: ExclamationTriangleIcon,
    info: ExclamationTriangleIcon,
  };

  const IconComponent = icons[type];

  return (
    <div className={`fixed z-50 top-8 transition-all duration-1000 ease-out ${isVisible ? 'transform translate-x-0 right-8' : 'transform translate-x-full right-0'}`}>
      <div className={`p-4 w-96 rounded-md ${alertStyles[type]} border relative overflow-hidden`}>
        {autoDismissTime && (
          <div
            className={`absolute top-0 left-0 h-1 ${progressBarStyles[type]} transition-all duration-100 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        )}
        <div className="flex">
          <div className="flex-shrink-0">
            <IconComponent
              className={`w-5 h-5 ${iconStyles[type]}`}
              aria-hidden="true"
            />
          </div>
          <div className="flex-grow ml-3">
            <h3 className="text-sm font-medium">{title}</h3>

            {/* Alert with description */}
            {description && (
              <div className="mt-2 text-sm">
                <p>{description}</p>
              </div>
            )}

            {/* Alert with list */}
            {listItems && (
              <ul className="mt-2 text-sm list-disc list-inside">
                {listItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}

            {/* Alert with actions */}
            {actions && (
              <div className="flex mt-4 space-x-3">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    onClick={action.onClick}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dismiss button */}
          {dismissible && (
            <div className="absolute top-0 right-0 p-2">
              <button onClick={onDismiss} className="bg-transparent">
                <XMarkIcon
                  className={`w-5 h-5 ${iconStyles[type]}`}
                  aria-hidden="true"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(["success", "error", "warning", "info"]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  listItems: PropTypes.arrayOf(PropTypes.string),
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ),
  autoDismissTime: PropTypes.number,
};

export default Alert;
