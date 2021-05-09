import {Organization} from './organization';

export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdDate: number;
  organization?: Organization;
}

export const defaultUser: User = {
  id: 0,
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  createdDate: 0,
  organization: undefined
};
