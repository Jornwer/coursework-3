import {Component, Input} from '@angular/core';
import {Organization} from '../../../shared/model/organization';

@Component({
  selector: 'app-company-admin',
  templateUrl: './company-admin.component.html',
  styleUrls: ['./company-admin.component.scss']
})
export class CompanyAdminComponent{

  @Input() organization: Organization | undefined;

  constructor() { }
}
