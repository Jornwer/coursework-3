import {Organization} from './organization';

export interface Decision {
  id: number;
  name: string;
  description: string;
  strategyList: string;
  natureStatesCounter: string;
  organization: Organization;
  createdDate: number;
}
