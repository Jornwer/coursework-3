import {Component, Input} from '@angular/core';
import {Organization} from '../../../shared/model/organization';

@Component({
  selector: 'app-company-user',
  templateUrl: './company-user.component.html',
  styleUrls: ['./company-user.component.scss']
})
export class CompanyUserComponent{

  @Input() organization: Organization | undefined;

  constructor() { }
}
