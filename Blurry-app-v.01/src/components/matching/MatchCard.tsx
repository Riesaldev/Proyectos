import React from 'react';
import { motion } from 'framer-motion';
import { Heart, X, MessageCircle, Video } from 'lucide-react';
import { User } from '../../types';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface MatchCardProps {
  user: User;
  onLike: () => void;
  onPass: () => void;
  onMessage?: () => void;
  onVideoCall?: () => void;
  compatibility?: number;
  isMatched?: boolean;
}

const MatchCard: React.FC<MatchCardProps> = ({
  user,
  onLike,
  onPass,
  onMessage,
  onVideoCall,
  compatibility,
  isMatched = false,
}) => {
  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto overflow-hidden rounded-xl shadow-lg bg-white"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      {/* User Photo with Blurred Effect */}
      <div className="relative h-96 w-full overflow-hidden">
        <img
          src={user.photos[0] || "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
          alt={`${user.name}'s profile`}
          className="w-full h-full object-cover"
          style={{ filter: 'blur(8px)' }}
        />
        
        {/* Compatibility badge */}
        {compatibility && (
          <div className="absolute top-4 right-4">
            <Badge variant="success" size="md" className="font-bold">
              {compatibility}% Match
            </Badge>
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        {/* User info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-1">
            {user.name}, {user.age}
          </h3>
          <p className="text-sm mb-2">{user.location}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {user.interests.map((interest) => (
              <Badge key={interest} variant="primary" size="sm">
                {interest}
              </Badge>
            ))}
          </div>
          
          <p className="text-sm text-gray-200 line-clamp-3">
            {user.bio}
          </p>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="p-4 flex justify-center gap-4">
        {isMatched ? (
          <>
            {onMessage && (
              <Button
                variant="outline"
                leftIcon={<MessageCircle />}
                onClick={onMessage}
              >
                Message
              </Button>
            )}
            
            {onVideoCall && (
              <Button
                variant="primary"
                leftIcon={<Video />}
                onClick={onVideoCall}
              >
                Video Call
              </Button>
            )}
          </>
        ) : (
          <>
            <Button 
              variant="outline" 
              className="rounded-full h-16 w-16 !p-0 border-error-400"
              onClick={onPass}
            >
              <X size={30} className="text-error-500" />
            </Button>
            
            <Button 
              variant="outline" 
              className="rounded-full h-16 w-16 !p-0 border-primary-400"
              onClick={onLike}
            >
              <Heart size={30} className="text-primary-500" />
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default MatchCard;