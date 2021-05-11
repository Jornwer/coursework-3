import {User} from './user';

export interface Organization {
  id: number;
  name: string;
  type: string;
  users: User[];
  createdDate: number;
  employeeCount: number;
}
