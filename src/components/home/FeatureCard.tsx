import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import Card from '../ui/Card';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  color = 'blue',
}) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    amber: 'bg-amber-100 text-amber-600',
    red: 'bg-red-100 text-red-600',
  };

  const bgColor = colorMap[color] || colorMap.blue;

  return (
    <Card className="h-full">
      <div className="p-6">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bgColor} mb-4`}>
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Card>
  );
};

export default FeatureCard;