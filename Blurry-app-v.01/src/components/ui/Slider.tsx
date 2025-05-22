import React, { useState } from 'react';

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  showValue?: boolean;
  disabled?: boolean;
  className?: string;
}

const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  label,
  showValue = true,
  disabled = false,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };
  
  // Calculate the percentage for the progress bar
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className={`${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <label className="text-sm font-medium text-gray-700">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm text-gray-500">
              {value}
            </span>
          )}
        </div>
      )}
      
      <div className="relative">
        <div 
          className={`h-2 rounded-full ${disabled ? 'bg-gray-200' : 'bg-gray-200'}`}
        >
          <div 
            className={`absolute h-2 rounded-full ${disabled ? 'bg-gray-400' : 'bg-primary-500'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className={`
            absolute top-0 w-full h-2 opacity-0 cursor-pointer
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
        />
        
        <div 
          className={`
            absolute h-4 w-4 rounded-full shadow transform -translate-y-1 
            ${disabled ? 'bg-gray-400' : isFocused ? 'bg-primary-600 scale-125' : 'bg-primary-500'}
            transition-all duration-150
          `}
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
    </div>
  );
};

export default Slider;