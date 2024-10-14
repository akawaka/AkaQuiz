// src/components/typography/BodyText.jsx
import PropTypes from 'prop-types';

/**
 * BodyText component for displaying paragraphs, blockquotes, and other body text elements.
 */
export const BodyText = ({ variant, children, className, ...props }) => {
  const variantStyle = {
    paragraph: 'text-lg tracking-wide text-slate-800',
    blockquote: 'text-xl font-semibold text-slate-900',
    small: 'text-sm text-slate-600',
  };

  // Map the variant to the appropriate HTML tag
  const Tag = variant === 'blockquote' ? 'blockquote' : 'p';

  return (
    <Tag className={`${variantStyle[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

BodyText.propTypes = {
  /**
   * The type of body text to render
   */
  variant: PropTypes.oneOf(['paragraph', 'blockquote', 'small']).isRequired,
  /**
   * Content to display inside the BodyText component
   */
  children: PropTypes.node.isRequired,
  /**
   * Additional classes for styling
   */
  className: PropTypes.string,
};

export default BodyText;
