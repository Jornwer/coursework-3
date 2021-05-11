import {User} from './user';

export interface Organization {
  id: number;
  name: string;
  type: string;
  users: User[];
  createdDate: number;
  employeeCount: number;
}

export const defaultOrganization: Organization = {
  id: 0,
  name: '',
  type: '',
  users: new Array<User>(),
  createdDate: 0,
  employeeCount: 0
};
