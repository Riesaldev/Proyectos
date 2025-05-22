import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | 'busy';
  isBlurred?: boolean;
  blurLevel?: number; // 1-10 scale
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'User avatar',
  size = 'md',
  status,
  isBlurred = false,
  blurLevel = 5,
}) => {
  const sizeClasses = {
    xs: 'h-8 w-8',
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
  };
  
  const statusColors = {
    online: 'bg-success-500',
    offline: 'bg-gray-400',
    away: 'bg-warning-500',
    busy: 'bg-error-500',
  };
  
  // Calculate blur amount based on blurLevel (1-10)
  const blurAmount = isBlurred ? `blur(${blurLevel * 0.6}px)` : 'none';
  
  return (
    <div className="relative inline-block">
      <div 
        className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200 flex items-center justify-center`}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover blur "
            style={{ filter: blurAmount }}
          />
        ) : (
          <div className="text-gray-500 uppercase font-medium text-center">
            {alt.slice(0, 2)}
          </div>
        )}
      </div>
      
      {status && (
        <span 
          className={`absolute bottom-0 right-0 rounded-full ${statusColors[status]} h-3 w-3 border-2 border-white`}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Avatar;