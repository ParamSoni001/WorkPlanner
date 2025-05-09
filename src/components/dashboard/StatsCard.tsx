import React from 'react';
import Card from '../ui/Card';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  change,
}) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    amber: 'bg-amber-100 text-amber-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  const bgColor = colorMap[color] || colorMap.blue;

  return (
    <Card className="h-full">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
            
            {change && (
              <div className="mt-2 flex items-center">
                <span
                  className={`text-sm font-medium ${
                    change.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {change.isPositive ? '+' : '-'}{Math.abs(change.value)}%
                </span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            )}
          </div>

          <div className={`p-3 rounded-lg ${bgColor}`}>
            <Icon size={24} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;