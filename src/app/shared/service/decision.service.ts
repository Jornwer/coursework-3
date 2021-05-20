import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Decision} from '../model/decision';
import {serverUrl} from '../server.url';

@Injectable({
  providedIn: 'root'
})
export class DecisionService {
  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Decision[]> {
    return this.httpClient.get<Decision[]>(serverUrl + 'strategic/decisions');
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(serverUrl + `strategic/decisions/${id}`);
  }
}
