import React from "react";
import { cn } from "@/lib/utils";

interface MessageTickerProps {
  message: string;
}

export const MessageTicker: React.FC<MessageTickerProps> = ({ message }) => {
  return (
    <div className="w-full overflow-hidden border-t border-b border-primary py-1.5">
      <div className="flex animate-ticker">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="flex items-center whitespace-nowrap pl-4 text-[13px]"
          >
            <svg
              width="15"
              height="13"
              viewBox="0 0 15 13"
              className="w-3 h-3 mr-4 text-primary"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="7.47064"
                cy="6.30443"
                rx="7.84587"
                ry="5.07377"
                transform="rotate(-26.5684 7.47064 6.30443)"
                fill="#CCFF00"
              />
            </svg>

            <span>{message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
