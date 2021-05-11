import {Component, Input} from '@angular/core';
import {defaultOrganization, Organization} from '../../shared/model/organization';

@Component({
  selector: 'app-company-admin',
  templateUrl: './company-admin.component.html',
  styleUrls: ['./company-admin.component.scss']
})
export class CompanyAdminComponent{

  @Input() organization: Organization = defaultOrganization;

  constructor() { }

  enterCompany(): void {
    // todo
  }
}
