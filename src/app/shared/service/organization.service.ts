import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Organization} from '../model/organization';
import {Observable} from 'rxjs';
import {serverUrl} from '../server.url';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  constructor(private httpClient: HttpClient) {
  }

  getAllOrganizations(): Observable<Organization[]> {
    return this.httpClient.get<Organization[]>(serverUrl + 'organizations');
  }
}
