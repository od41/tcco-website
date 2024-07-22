import React from "react";

const StyledContent = ({
  content,
  specialStyle,
}: {
  content: string;
  specialStyle: string;
}) => {
  // Split the content by the special marker
  const parts = content.split(/(\*\*.*?\*\*)/g);

  // Default style for special words
  const defaultSpecialStyle = "text-green-500 font-bold";

  // Use the provided specialStyle or fall back to the default
  const appliedSpecialStyle = specialStyle || defaultSpecialStyle;

  return (
    <p>
      {parts.map((part: string, index: React.Key) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          // Remove the asterisks and apply special styling
          const word = part.slice(2, -2);
          return (
            <span key={index} className={appliedSpecialStyle}>
              {word}
            </span>
          );
        }
        // Return regular text as is
        return part;
      })}
    </p>
  );
};

export default StyledContent;
