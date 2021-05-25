import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RawDecision} from '../model/rawDecision';
import {serverUrl} from '../server.url';
import {map} from 'rxjs/operators';
import {Decision, DecisionModel, Value} from '../model/decision';
import {DecisionPayload} from '../payload/decision.payload';
import {defaultUser} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class DecisionService {
  constructor(private httpClient: HttpClient) {}

  mapRawDecision(raw: RawDecision): Decision {
    const decision: Decision = {
      id: 0,
      user: defaultUser,
      name: '',
      minProfit: 0,
      values: new Array<Value>()
    };
    const split = raw.data.split(':;');

    decision.minProfit = Number(split[0]);
    decision.user = raw.user;
    decision.id = raw.id;
    decision.name = raw.name;
    split[1].split(';:').forEach(d => {
      const value: Value = {
        name: '',
        buy: new Array<number>(),
        div: new Array<number>(),
        sell: new Array<number>()
      };
      const strs = d.split(';');
      value.name = strs[0];
      strs.slice(1).forEach(val => {
        const arr = val.split(':');
        value.buy.push(Number(arr[0]));
        value.div.push(Number(arr[1]));
        value.sell.push(Number(arr[2]));
      });
      decision.values.push(value);
    });
    return decision;
  }

  mapDecisionToServer(decision: Decision): DecisionModel {
    return  {
      id: decision.id,
      user: decision.user,
      name: decision.name,
      data: this.mapData(decision)
    };
  }

  mapDecision(decision: Decision): DecisionPayload {
    return  {
      name: decision.name,
      data: this.mapData(decision)
    };
  }

  private mapData(decision: Decision): string {
    let data: string;
    data = String(decision.minProfit) + ':;';
    decision.values.forEach(value => {
      data += value.name + ';';
      for (let i = 0; i < value.sell.length; i++) {
        data += String(value.buy[i]) + ':' + String(value.div[i]) + ':' + String(value.sell[i]);
        if (i !== value.sell.length - 1) {
          data += ';';
        }
      }
      data += ';:';
    });
    return data.slice(0, data.length - 2);
  }

  findAll(): Observable<Decision[]> {
    return this.httpClient.get<RawDecision[]>(serverUrl + 'statistic/decisions')
      .pipe(map(raw => {
        const decisions = new Array<Decision>();
        raw.forEach(r => {
          decisions.push(this.mapRawDecision(r));
        });
        return decisions;
      }));
  }

  findById(id: number): Observable<Decision> {
    return this.httpClient.get<RawDecision>(serverUrl + `statistic/decisions/${id}`)
      .pipe(map(raw => this.mapRawDecision(raw)));
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(serverUrl + `statistic/decisions/${id}`);
  }

  add(decision: Decision): Observable<any> {
    return this.httpClient.post(serverUrl + `statistic/decisions/add`, this.mapDecision(decision));
  }

  update(decision: Decision): Observable<any> {
    return this.httpClient.post(serverUrl + `statistic/decisions/update`, this.mapDecisionToServer(decision));
  }
}
