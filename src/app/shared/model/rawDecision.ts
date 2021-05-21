import {User} from './user';

export interface RawDecision {
  id: number;
  user: User;
  name: string;
  data: string;
}
