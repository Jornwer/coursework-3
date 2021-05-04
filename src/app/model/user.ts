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
  organization: Organization;
}
