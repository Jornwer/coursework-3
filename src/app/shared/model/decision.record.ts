import {Decision} from './decision';

export interface DecisionRecord {
  waldCriterion: number;
  savageCriterion: number;
  gurvitzCriterion: number;
  decision: Decision;
  id: number;
  createdDate: number;
}
