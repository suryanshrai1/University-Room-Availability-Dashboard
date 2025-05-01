export type RoomStatus = 'available' | 'occupied' | 'reserved';

export interface Room {
  id: string;
  number: string;
  building: string;
  floor: number;
  status: RoomStatus;
  capacity: number;
  equipment: string[];
  lastUpdated: Date;
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'staff' | 'student';
  isAuthenticated: boolean;
}