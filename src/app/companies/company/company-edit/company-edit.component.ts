import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrganizationService} from '../../../shared/service/organization.service';
import {defaultOrganization} from '../../../shared/model/organization';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrganizationPayload} from '../../../shared/payload/organization.payload';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent {

  organizationId = 0;
  organization = defaultOrganization;
  form: FormGroup;
  isError = false;

  constructor(private activateRoute: ActivatedRoute, private router: Router,
              private organizationService: OrganizationService) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.pattern('[a-zA-Zа-яА-Я\\\\s\\\\d]{2,30}')]),
      type: new FormControl('', [Validators.pattern('[a-zA-Zа-яА-Я\\\\s]{2,30}')])
    });
    activateRoute.params.subscribe(p => this.organizationId = p.id);
    organizationService.getOrganizationById(this.organizationId).subscribe(org => {
      this.organization = org;
      this.form.get('name')?.setValue(this.organization.name);
      this.form.get('type')?.setValue(this.organization.type);
    });
  }

  submit(): void {
    const payload: OrganizationPayload = {
      name: this.form.get('name')?.value,
      type: this.form.get('type')?.value
    };
    this.organizationService.changeOrganization(this.organizationId, payload).subscribe(() => {
      this.isError = false;
      this.router.navigateByUrl('/');
    }, () => this.isError = true);
  }
}
