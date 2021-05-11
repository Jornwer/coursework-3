import {Component, Input} from '@angular/core';
import {defaultOrganization, Organization} from '../../../shared/model/organization';

@Component({
  selector: 'app-company-user',
  templateUrl: './company-user.component.html',
  styleUrls: ['./company-user.component.scss']
})
export class CompanyUserComponent{

  @Input() organization: Organization = defaultOrganization;

  constructor() { }

  enterCompany(): void {
    // todo
  }
}
