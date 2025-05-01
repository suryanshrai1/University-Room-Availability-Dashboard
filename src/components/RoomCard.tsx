import React from 'react';
import { Room } from '../types';
import { Clock, Users, Cpu } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  onClick: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onClick }) => {
  // Status-based styling
  const getStatusStyles = () => {
    switch (room.status) {
      case 'available':
        return 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700';
      case 'occupied':
        return 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700';
      case 'reserved':
        return 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700';
      default:
        return 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700';
    }
  };

  const getStatusTextStyles = () => {
    switch (room.status) {
      case 'available':
        return 'text-green-800 dark:text-green-400 bg-green-200 dark:bg-green-900/50';
      case 'occupied':
        return 'text-red-800 dark:text-red-400 bg-red-200 dark:bg-red-900/50';
      case 'reserved':
        return 'text-amber-800 dark:text-amber-400 bg-amber-200 dark:bg-amber-900/50';
      default:
        return 'text-gray-800 dark:text-gray-400 bg-gray-200 dark:bg-gray-800';
    }
  };

  // Format the last updated time
  const formatLastUpdated = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div 
      className={`relative rounded-lg border p-4 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer ${getStatusStyles()}`}
      onClick={() => onClick(room)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Room {room.number}
        </h3>
        <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${getStatusTextStyles()}`}>
          {room.status}
        </span>
      </div>
      
      <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">
        {room.building}, Floor {room.floor}
      </div>
      
      <div className="space-y-2 mt-3">
        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
          <Users size={16} className="mr-2" />
          <span>Capacity: {room.capacity}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
          <Cpu size={16} className="mr-2" />
          <span>{room.equipment.slice(0, 2).join(', ')}{room.equipment.length > 2 ? '...' : ''}</span>
        </div>
      </div>
      
      <div className="absolute bottom-2 right-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
        <Clock size={12} className="mr-1" />
        <span>Updated: {formatLastUpdated(room.lastUpdated)}</span>
      </div>
    </div>
  );
};

export default RoomCard;