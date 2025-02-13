import type React from "react";

interface RingProgressProps {
  progress: number;
  size?: "sm" | "md" | "lg";
  strokeWidth?: number;
}

const RingProgress: React.FC<RingProgressProps> = ({
  progress,
  size = "sm",
  strokeWidth = 4,
}) => {
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  const radius = size === "sm" ? 40 : size === "md" ? 60 : 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (normalizedProgress / 100) * circumference;

  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-40 h-40",
  };

  const fontSizeClasses = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div
      className={`relative ${sizeClasses[size]} flex items-center justify-center`}
    >
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${radius * 2 + strokeWidth} ${radius * 2 + strokeWidth}`}
      >
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
        />
        <circle
          className="text-green-600"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          transform={`rotate(-90 ${radius + strokeWidth / 2} ${
            radius + strokeWidth / 2
          })`}
        />
      </svg>
      <div className={`absolute ${fontSizeClasses[size]} font-semibold`}>
        {normalizedProgress.toFixed(2)}%
      </div>
    </div>
  );
};

export default RingProgress;
