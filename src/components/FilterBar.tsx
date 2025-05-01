import React from 'react';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  buildings: string[];
  floors: number[];
  selectedBuilding: string;
  selectedFloor: number | null;
  selectedStatus: string;
  onBuildingChange: (building: string) => void;
  onFloorChange: (floor: number | null) => void;
  onStatusChange: (status: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  buildings,
  floors,
  selectedBuilding,
  selectedFloor,
  selectedStatus,
  onBuildingChange,
  onFloorChange,
  onStatusChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center">
          <Filter size={16} className="mr-2 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          {/* Building Filter */}
          <div className="w-full sm:w-auto">
            <select
              value={selectedBuilding}
              onChange={(e) => onBuildingChange(e.target.value)}
              className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-1.5 pl-3 pr-10 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <option value="">All Buildings</option>
              {buildings.map((building) => (
                <option key={building} value={building}>
                  {building}
                </option>
              ))}
            </select>
          </div>
          
          {/* Floor Filter */}
          <div className="w-full sm:w-auto">
            <select
              value={selectedFloor === null ? '' : selectedFloor}
              onChange={(e) => onFloorChange(e.target.value ? Number(e.target.value) : null)}
              className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-1.5 pl-3 pr-10 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <option value="">All Floors</option>
              {floors.sort((a, b) => a - b).map((floor) => (
                <option key={floor} value={floor}>
                  Floor {floor}
                </option>
              ))}
            </select>
          </div>
          
          {/* Status Filter */}
          <div className="w-full sm:w-auto">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-1.5 pl-3 pr-10 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <option value="">All Statuses</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="reserved">Reserved</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;