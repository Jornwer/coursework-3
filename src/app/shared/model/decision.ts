import {defaultUser, User} from './user';

export interface Value {
  name: string;
  buy: number[];
  div: number[];
  sell: number[];
}

export interface DecisionModel {
  id: number;
  name: string;
  data: string;
  user: User;
}

export interface Decision {
  id: number;
  user: User;
  name: string;
  minProfit: number;
  values: Value[];
}

export const defaultDecision: Decision = {
  id: 0,
  user: defaultUser,
  name: '',
  minProfit: 0,
  values: new Array<Value>()
};
