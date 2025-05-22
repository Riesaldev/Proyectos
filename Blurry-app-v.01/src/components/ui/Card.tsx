import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  isNeumorphic?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  isNeumorphic = false,
  onClick,
}) => {
  const baseClasses = "bg-white rounded-xl overflow-hidden";
  const neumorphicClasses = isNeumorphic 
    ? "shadow-neumorphic bg-gray-50" 
    : "shadow-lg";
  const hoverClasses = hoverEffect 
    ? "transition-all duration-200 hover:-translate-y-1 hover:shadow-xl" 
    : "";
  const clickableClasses = onClick ? "cursor-pointer" : "";
  
  return (
    <motion.div
      className={`
        ${baseClasses}
        ${neumorphicClasses}
        ${hoverClasses}
        ${clickableClasses}
        ${className}
      `}
      onClick={onClick}
      whileHover={hoverEffect ? { y: -4 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;