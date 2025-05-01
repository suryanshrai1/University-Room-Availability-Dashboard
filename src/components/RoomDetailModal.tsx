import React from 'react';
import { Room } from '../types';
import { X, Users, Clock, Monitor, Check } from 'lucide-react';

interface RoomDetailModalProps {
  room: Room | null;
  onClose: () => void;
  onStatusChange: (roomId: string, newStatus: Room['status']) => void;
}

const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  onClose,
  onStatusChange,
}) => {
  if (!room) return null;

  const statusClasses = {
    available: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    occupied: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    reserved: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  };

  const formatLastUpdated = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full mx-auto shadow-xl animate-fadeIn overflow-hidden">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Room {room.number} Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Room details */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div>
              <p className="text-lg font-medium text-gray-800 dark:text-white">
                {room.building}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Floor {room.floor}
              </p>
            </div>
            <div className="mt-2 md:mt-0">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  statusClasses[room.status]
                }`}
              >
                {room.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <Users size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
              <span className="text-gray-700 dark:text-gray-300">
                Capacity: {room.capacity} people
              </span>
            </div>
            <div className="flex items-center">
              <Clock size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
              <span className="text-gray-700 dark:text-gray-300">
                Last updated: {formatLastUpdated(room.lastUpdated)}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Equipment
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {room.equipment.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <Check size={16} className="mr-2 text-green-600 dark:text-green-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Update Status
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onStatusChange(room.id, 'available')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  room.status === 'available'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-green-600 border border-green-600 hover:bg-green-50'
                }`}
              >
                Available
              </button>
              <button
                onClick={() => onStatusChange(room.id, 'occupied')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  room.status === 'occupied'
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-red-600 border border-red-600 hover:bg-red-50'
                }`}
              >
                Occupied
              </button>
              <button
                onClick={() => onStatusChange(room.id, 'reserved')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  room.status === 'reserved'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-amber-600 border border-amber-600 hover:bg-amber-50'
                }`}
              >
                Reserved
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailModal;