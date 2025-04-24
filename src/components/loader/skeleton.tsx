// components/Skeleton.tsx
import React from "react";
import clsx from "clsx";

interface SkeletonProps {
  className?: string;
  height?: string;
  color?: string;
  width?: any;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  height = "h-4",
  color = "bg-gray-300",
  width = "w-full",
}) => {
  return (
    <div
      className={clsx(
        "w-full animate-shimmer bg-gradient-to-r rounded-xl from-transparent via-white/5 to-transparent border-t border-white/5 bg-[length:200%]",
        height,
        color,
        className,
        width
      )}
    ></div>
  );
};

export default Skeleton;
