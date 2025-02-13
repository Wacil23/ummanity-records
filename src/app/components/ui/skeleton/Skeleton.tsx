// Skeleton.jsx
import React from "react";

interface SkeletonProps {
  loading: boolean;
  animationSpeed?: number;
  width?: string;
  height?: string;
  className?: string;
  children: React.ReactNode;
}

const Skeleton = ({
  loading = true,
  width = "w-full",
  height = "h-6",
  className = "",
  children,
}: SkeletonProps) => {
  if (!loading) return children;

  return (
    <div
      className={`relative rounded-md overflow-hidden ${width} ${height} ${className}`}
    >
      <div className="absolute inset-0 rounded-md bg-gray-100" />
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100  animate-shimmer" />
    </div>
  );
};

export default Skeleton;
