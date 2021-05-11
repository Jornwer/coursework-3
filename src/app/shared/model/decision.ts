import {Organization} from './organization';
import {DecisionRecord} from './decision.record';

export interface Decision {
  id: number;
  name: string;
  description: string;
  strategyList: string[];
  records: DecisionRecord[];
  natureStatesCounter: string;
  organization: Organization;
  createdDate: number;
}
