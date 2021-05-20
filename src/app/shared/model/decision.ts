import {User} from './user';

export interface Decision {
  id: number;
  user: User;
  name: string;
  data: string;
}
