import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TransportButton = ({ 
  icon, 
  label, 
  active, 
  disabled,
  onClick, 
  className,
  ...props 
}) => {
  return (
    <Button
      variant="transport"
      size="icon"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-12 h-12 rounded-full",
        active && "active",
        className
      )}
      {...props}
    >
      <ApperIcon name={icon} size={20} />
      <span className="sr-only">{label}</span>
    </Button>
  );
};

export default TransportButton;