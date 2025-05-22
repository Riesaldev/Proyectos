import React from 'react';
import { User, MapPin, Calendar, CheckCircle, Edit } from 'lucide-react';
import { User as UserType } from '../../types';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface ProfileCardProps {
  user: UserType;
  isEditable?: boolean;
  onEdit?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  isEditable = false,
  onEdit,
}) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex-shrink-0">
          <Avatar 
            src={user.photos[0] || undefined} 
            alt={`${user.name}'s avatar`}
            size="xl"
          />
          {user.isVerified && (
            <div className="mt-2 flex justify-center">
              <Badge variant="success" size="sm">
                <CheckCircle size={12} className="mr-1" />
                Verified
              </Badge>
            </div>
          )}
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {user.name}, {user.age}
              </h2>
              
              <div className="mt-1 flex items-center justify-center md:justify-start text-gray-600">
                <MapPin size={16} className="mr-1" />
                <span>{user.location}</span>
              </div>
              
              <div className="mt-1 flex items-center justify-center md:justify-start text-gray-600">
                <Calendar size={16} className="mr-1" />
                <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            {isEditable && (
              <div className="mt-4 md:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Edit size={16} />}
                  onClick={onEdit}
                >
                  Edit Profile
                </Button>
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">About Me</h3>
            <p className="mt-2 text-gray-600">{user.bio || 'No bio yet.'}</p>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Interests</h3>
            <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
              {user.interests.length > 0 ? (
                user.interests.map((interest) => (
                  <Badge key={interest} variant="primary">
                    {interest}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500">No interests added yet.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;