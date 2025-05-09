import React from 'react';
import { Mail, User as UserIcon } from 'lucide-react';
import { User } from '../../types';
import Card, { CardContent } from '../ui/Card';

interface ProfileCardProps {
  user: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            {user.name}
          </h2>
          
          <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium capitalize bg-blue-100 text-blue-800">
            {user.role}
          </span>
          
          <div className="mt-4 w-full space-y-3">
            <div className="flex items-center p-2 rounded-md bg-gray-50">
              <Mail size={16} className="text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">{user.email}</span>
            </div>
            
            <div className="flex items-center p-2 rounded-md bg-gray-50">
              <UserIcon size={16} className="text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">
                ID: {user.id.substring(0, 8)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;