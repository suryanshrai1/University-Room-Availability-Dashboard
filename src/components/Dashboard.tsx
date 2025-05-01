import React, { useState, useEffect } from 'react';
import { mockRooms, buildings, floors } from '../data/mockData';
import { Room } from '../types';
import RoomCard from './RoomCard';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import RoomDetailModal from './RoomDetailModal';
import { RefreshCw } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(mockRooms);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Apply filters
  useEffect(() => {
    let result = [...rooms];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((room) => 
        room.number.toLowerCase().includes(query) ||
        room.building.toLowerCase().includes(query) ||
        room.equipment.some((item) => item.toLowerCase().includes(query))
      );
    }
    
    // Apply building filter
    if (selectedBuilding) {
      result = result.filter((room) => room.building === selectedBuilding);
    }
    
    // Apply floor filter
    if (selectedFloor !== null) {
      result = result.filter((room) => room.floor === selectedFloor);
    }
    
    // Apply status filter
    if (selectedStatus) {
      result = result.filter((room) => room.status === selectedStatus);
    }
    
    setFilteredRooms(result);
  }, [rooms, searchQuery, selectedBuilding, selectedFloor, selectedStatus]);

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleStatusChange = (roomId: string, newStatus: Room['status']) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === roomId) {
        return {
          ...room,
          status: newStatus,
          lastUpdated: new Date(),
        };
      }
      return room;
    });
    
    setRooms(updatedRooms);
    
    // Also update the selected room if it's open
    if (selectedRoom && selectedRoom.id === roomId) {
      setSelectedRoom({
        ...selectedRoom,
        status: newStatus,
        lastUpdated: new Date(),
      });
    }
  };

  const refreshData = () => {
    setIsRefreshing(true);
    
    // Simulate API call with random status changes
    setTimeout(() => {
      const updatedRooms = rooms.map((room) => {
        // 20% chance of changing status for demo purposes
        if (Math.random() < 0.2) {
          const statuses: Room['status'][] = ['available', 'occupied', 'reserved'];
          const currentIndex = statuses.indexOf(room.status);
          const newIndex = (currentIndex + 1) % statuses.length;
          
          return {
            ...room,
            status: statuses[newIndex],
            lastUpdated: new Date(),
          };
        }
        return room;
      });
      
      setRooms(updatedRooms);
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Room Availability
          </h2>
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className={`inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors duration-200 ${
              isRefreshing ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw size={16} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Status'}
          </button>
        </div>
        
        <SearchBar onSearch={setSearchQuery} />
        
        <FilterBar
          buildings={buildings}
          floors={floors}
          selectedBuilding={selectedBuilding}
          selectedFloor={selectedFloor}
          selectedStatus={selectedStatus}
          onBuildingChange={setSelectedBuilding}
          onFloorChange={setSelectedFloor}
          onStatusChange={setSelectedStatus}
        />
      </div>
      
      {filteredRooms.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No rooms match your current filters. Try adjusting your search criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onClick={handleRoomClick}
            />
          ))}
        </div>
      )}
      
      {selectedRoom && (
        <RoomDetailModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default Dashboard;