import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Organization} from '../model/organization';
import {Observable} from 'rxjs';
import {serverUrl} from '../server.url';
import {OrganizationPayload} from '../payload/organization.payload';
import {tap} from 'rxjs/operators';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  constructor(private httpClient: HttpClient, private userService: UserService) {
  }

  getAllOrganizations(): Observable<Organization[]> {
    return this.httpClient.get<Organization[]>(serverUrl + 'organizations');
  }

  createOrganization(organizationPayload: OrganizationPayload): Observable<Organization> {
    return this.httpClient.post<Organization>(serverUrl + 'organizations/add', organizationPayload)
      .pipe(
        tap(org => {
          this.userService.changeCompany(org.id);
        })
      );
  }
}
