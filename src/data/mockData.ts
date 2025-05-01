import { Room } from '../types';

// Mock data for rooms
export const mockRooms: Room[] = [
  {
    id: '1',
    number: '101',
    building: 'Science Building',
    floor: 1,
    status: 'available',
    capacity: 30,
    equipment: ['Projector', 'Whiteboard'],
    lastUpdated: new Date(),
  },
  {
    id: '2',
    number: '102',
    building: 'Science Building',
    floor: 1,
    status: 'occupied',
    capacity: 25,
    equipment: ['Projector', 'Smartboard', 'Computer'],
    lastUpdated: new Date(),
  },
  {
    id: '3',
    number: '201',
    building: 'Science Building',
    floor: 2,
    status: 'available',
    capacity: 40,
    equipment: ['Projector', 'Whiteboard', 'Computer'],
    lastUpdated: new Date(),
  },
  {
    id: '4',
    number: '202',
    building: 'Science Building',
    floor: 2,
    status: 'reserved',
    capacity: 35,
    equipment: ['Projector', 'Whiteboard'],
    lastUpdated: new Date(),
  },
  {
    id: '5',
    number: '301',
    building: 'Arts Building',
    floor: 3,
    status: 'available',
    capacity: 20,
    equipment: ['Whiteboard'],
    lastUpdated: new Date(),
  },
  {
    id: '6',
    number: '302',
    building: 'Arts Building',
    floor: 3,
    status: 'occupied',
    capacity: 15,
    equipment: ['Projector'],
    lastUpdated: new Date(),
  },
  {
    id: '7',
    number: '101',
    building: 'Library',
    floor: 1,
    status: 'available',
    capacity: 10,
    equipment: ['Whiteboard', 'Computer'],
    lastUpdated: new Date(),
  },
  {
    id: '8',
    number: '201',
    building: 'Library',
    floor: 2,
    status: 'reserved',
    capacity: 8,
    equipment: ['Computer'],
    lastUpdated: new Date(),
  },
  {
    id: '9',
    number: '102',
    building: 'Engineering',
    floor: 1,
    status: 'occupied',
    capacity: 45,
    equipment: ['Projector', 'Whiteboard', 'Computer', 'Lab Equipment'],
    lastUpdated: new Date(),
  },
  {
    id: '10',
    number: '103',
    building: 'Engineering',
    floor: 1,
    status: 'available',
    capacity: 50,
    equipment: ['Projector', 'Whiteboard', 'Computer', 'Lab Equipment'],
    lastUpdated: new Date(),
  },
  {
    id: '11',
    number: '104',
    building: 'Engineering',
    floor: 1,
    status: 'reserved',
    capacity: 30,
    equipment: ['Projector', 'Whiteboard'],
    lastUpdated: new Date(),
  },
  {
    id: '12',
    number: '301',
    building: 'Business',
    floor: 3,
    status: 'available',
    capacity: 60,
    equipment: ['Projector', 'Whiteboard', 'Computer'],
    lastUpdated: new Date(),
  },
];

// Buildings data
export const buildings = Array.from(
  new Set(mockRooms.map((room) => room.building))
);

// Floors data
export const floors = Array.from(
  new Set(mockRooms.map((room) => room.floor))
);