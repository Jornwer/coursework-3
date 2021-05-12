import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent {

  organizationId = 0;

  constructor(private activateRoute: ActivatedRoute) {
    activateRoute.params.subscribe(p => this.organizationId = p.id);
  }
}
